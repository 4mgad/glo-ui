import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";
import Frame from 'react-frame-component';
import {
	ChartCanvas,
	Chart,
	series,
	coordinates,
	annotation,
	axes,
	tooltip,
	helper
} from "react-stockcharts";

import ColorSchemes from "../../globals/colorSchemes";
import AbstractChart from "../abstracts/AbstractChart";

import './PortfolioChart.scss';

let {LineSeries, AreaOnlySeries, ScatterSeries, CircleMarker} = series;

let {CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate, EdgeIndicator} = coordinates;
let {Annotate, SvgPathAnnotation, Label} = annotation;

let {SingleValueTooltip, HoverTooltip} = tooltip;
let {XAxis, YAxis} = axes;

let {fitWidth} = helper;

const moneyF = d3.format(",.2f");
const dateF = d3.timeFormat("%d-%b-%Y");
const dateP = d3.timeParse("%Y-%m-%d");

const principalPostfix = "_principal";
const firstProjectedField = "_firstProjected";
const investmentAmountApplied = "_investmentAmountApplied";

const getYAccessor = (accessor, postfix) => {
	postfix = postfix || "";
	return (d) => {
		if (d[accessor + postfix]) {
			return d[accessor + postfix];
		}
	};
};

class LineChart extends Component {
	static propTypes = {
		colorScheme: PropTypes.oneOf(Object.keys(ColorSchemes)),
		principal: PropTypes.number.isRequired,
		investmentFrequency: PropTypes.oneOf(["Monthly", "Yearly"]).isRequired,
		investmentAmount: PropTypes.number.isRequired,
		dateField: PropTypes.string.isRequired,
		rebalancedField: PropTypes.string.isRequired,
		portfolioField: PropTypes.string.isRequired,
		highField: PropTypes.string,
		lowField: PropTypes.string,
		historicalData: PropTypes.array.isRequired,
		projectedData: PropTypes.array.isRequired,
		visibleDateRange: PropTypes.array.isRequired,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		showLegend: PropTypes.bool.isRequired,
		showHoverLegend: PropTypes.bool.isRequired,
		showTopMouseCoordinate: PropTypes.bool.isRequired,
		showLeftMouseCoordinate: PropTypes.bool.isRequired,
		showRightIndicatorsFor: PropTypes.array.isRequired,
		margin: PropTypes.shape({
			top: PropTypes.number,
			right: PropTypes.number,
			bottom: PropTypes.number,
			left: PropTypes.number
		}).isRequired,

		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		ratio: PropTypes.number.isRequired,
		type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
		showGrid: PropTypes.bool
	};

	static defaultProps = {
		colorScheme: "dark2",
		startDate: "",
		endDate: "",
		showGrid: true,
		type: "hybrid"
	};

	state = {
		chartAccessors: [],
		chartData: [],
		chartMargin: JSON.parse(JSON.stringify(this.props.margin))
	};

	componentWillMount() {
		let {colorScheme} = this.props;
		this.topMarginPadding = 5;
		this.color = d3.scaleOrdinal(ColorSchemes[colorScheme]);
		this.initChart(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.initChart(nextProps);
	}

	componentDidMount() {
		this.updateChartMargin();
	}

	componentDidUpdate() {
		this.updateChartMargin();
	}

	getExpectedTop() {
		let {margin, showTopMouseCoordinate} = this.props;
		this.legendOriginsMap = this.legendOriginsMap || {};
		let numberOfLines = Object.keys(this.legendOriginsMap).length;
		let expectedTop = (this.topMarginPadding * 2) + (showTopMouseCoordinate ? margin.top : 0) + (numberOfLines * margin.top);
		return expectedTop;
	}

	updateChartMargin() {
		let {chartMargin} = this.state;
		let expectedTop = this.getExpectedTop();
		delete this.legendOriginsMap;
		if (chartMargin.top !== expectedTop) {
			chartMargin.top = expectedTop;
			this.setState({chartMargin});
		}
	}

	getNewLeftOrigin(lineId) {
		let {chartAccessors} = this.state;
		let linesMap = this.legendOriginsMap[lineId];
		if (linesMap) {
			let numberOfLegends = Object.keys(linesMap).length;
			let gridWidth = this.getGridWidth();
			let legendWidth = chartAccessors.length ? gridWidth / chartAccessors.length : gridWidth;
			let legendLeftOrigin = this.topMarginPadding + ((numberOfLegends * legendWidth) - legendWidth);
			return legendLeftOrigin;
		}
		return 0;
	}

	getNewTopOrigin() {
		let {margin} = this.props;
		let {chartMargin} = this.state;
		let numberOfLines = Object.keys(this.legendOriginsMap).length;
		let firstLineLoc = (0 - chartMargin.top) + this.topMarginPadding + (margin.top / 2);
		let legendTopOrigin = firstLineLoc + (margin.top * numberOfLines);
		return legendTopOrigin;
	}

	getLegendOrigins(lineId, legend) {
		this.legendOriginsMap = this.legendOriginsMap || {};
		if (lineId) {
			if (!this.legendOriginsMap[lineId]) {
				this.legendOriginsMap[lineId] = {
					_lineOrigin: this.getNewTopOrigin()
				}
			}
			if (legend) {
				if (!this.legendOriginsMap[lineId][legend]) {
					this.legendOriginsMap[lineId][legend] = [this.getNewLeftOrigin(lineId), this.legendOriginsMap[lineId]["_lineOrigin"]];
				}
				return this.legendOriginsMap[lineId][legend];
			}
		}
		return [0, 0];
	}

	getChartConfig(data, principal, props) {
		let {dateField, portfolioField, startDate, endDate, investmentFrequency, investmentAmount} = props;
		let chartAccessors = [];
		let chartData = [];
		let prevDayPrincipalMap = {};
		data.map(d => {
			let skipDataPoint = false;
			let parsedDate = dateP(d[dateField]);
			if (startDate) {
				let parsedStartDate = dateP(startDate);
				if (parsedDate.getTime() < parsedStartDate.getTime()) {
					skipDataPoint = true;
				}
			}
			if (endDate) {
				let parsedEndDate = dateP(endDate);
				if (parsedDate.getTime() > parsedEndDate.getTime()) {
					skipDataPoint = true;
				}
			}
			if (!skipDataPoint) {
				let dCopy = JSON.parse(JSON.stringify(d));
				dCopy[dateField] = dateP(dCopy[dateField]);
				dCopy[principalPostfix] = principal;
				let additionalAmount = 0;
				if ((investmentFrequency + "").toLowerCase() === "monthly") {
					if (dCopy[dateField].getDate() === 1) {
						additionalAmount = investmentAmount;
						dCopy[investmentAmountApplied] = true;
					}
				} else if ((investmentFrequency + "").toLowerCase() === "yearly") {
					if (dCopy[dateField].getDate() === 1 && dCopy[dateField].getMonth() === 0) {
						additionalAmount = investmentAmount;
						dCopy[investmentAmountApplied] = true;
					}
				}
				for (let key in d) {
					if (!key.match(/^_/ig)) {
						let prevDayPrincipal = prevDayPrincipalMap[key] || principal;
						let calculatedPrincipal = (prevDayPrincipal * d[key]) + prevDayPrincipal + additionalAmount;
						prevDayPrincipalMap[key] = calculatedPrincipal;
						dCopy[key + principalPostfix] = calculatedPrincipal;
						if (!~chartAccessors.indexOf(key)) {
							chartAccessors.push(key);
						}
					}
				}
				chartData.push(dCopy);
			}
		});
		let lastChartDataPoint = chartData[chartData.length - 1];
		let lastPrincipal = lastChartDataPoint ? (lastChartDataPoint[portfolioField + principalPostfix] || principal) : principal;
		return {chartAccessors, chartData, lastPrincipal};
	}

	initChart(props) {
		let {historicalData, projectedData, principal} = props;
		let historicalConfig = this.getChartConfig(historicalData, principal, props);
		let projectedConfig = this.getChartConfig(projectedData, historicalConfig.lastPrincipal, props);
		let firstProjected = projectedConfig.chartData[0];
		if (firstProjected) {
			firstProjected[firstProjectedField] = true;
		}
		let chartAccessors = historicalConfig.chartAccessors.concat(projectedConfig.chartAccessors);
		let chartData = historicalConfig.chartData.concat(projectedConfig.chartData);
		this.setState({chartAccessors, chartData});
	}

	renderDateTooltip() {
		let {dateField} = this.props;
		let dateTooltip = [];
		dateTooltip.push(
			<SingleValueTooltip
				key="date_tooltip"
				className="legend"
				yLabel="Date"
				yAccessor={(d) => {
					if (d[dateField]) {
						return d[dateField];
					}
				}}
				yDisplayFormat={dateF}
				origin={this.getLegendOrigins("line1", "date_tooltip")}
				labelStroke="#C3C3C3"
				valueStroke="white"
			/>
		);
		return dateTooltip;
	}

	getRebalancedLabel() {
		return "Rebalanced";
	}

	getInvestmentFrequencyLabel() {
		let {investmentFrequency} = this.props;
		return "Investment (" + investmentFrequency + ")";
	}

	renderRebalancedTooltip() {
		let {rebalancedField} = this.props;
		let rebalancedTooltip = [];
		rebalancedField && rebalancedTooltip.push(
			<SingleValueTooltip
				key="rebalanced_tooltip"
				className="legend"
				yLabel={this.getRebalancedLabel()}
				yAccessor={(d) => {
					if (d[rebalancedField]) {
						return "Yes";
					}
					return "No";
				}}
				yDisplayFormat={f => f}
				origin={this.getLegendOrigins("line1", "rebalanced_tooltip")}
				labelStroke="#C3C3C3"
				valueStroke={this.color(this.getRebalancedLabel())}
			/>
		);
		return rebalancedTooltip;
	}

	renderInvestmentTooltip() {
		let {investmentAmount, investmentFrequency} = this.props;
		let investmentTooltip = [];
		investmentAmount && investmentTooltip.push(
			<SingleValueTooltip
				key="investment_tooltip"
				className="legend"
				yLabel={this.getInvestmentFrequencyLabel()}
				yAccessor={(d) => {
					if (d[investmentAmountApplied]) {
						return investmentAmount;
					}
					return 0;
				}}
				yDisplayFormat={val => "$" + moneyF(val)}
				origin={this.getLegendOrigins("line1", "investment_tooltip")}
				labelStroke="#C3C3C3"
				valueStroke={this.color(this.getInvestmentFrequencyLabel())}
			/>
		);
		return investmentTooltip;
	}

	renderChartLines() {
		let {
			showLegend,
			showRightIndicatorsFor,
			portfolioField,
			highField,
			lowField,
			rebalancedField,
			investmentAmount
		} = this.props;
		let {chartAccessors} = this.state;
		let chartLines = [];

		showLegend && chartLines.push(...this.renderDateTooltip());
		showLegend && chartLines.push(...this.renderRebalancedTooltip());
		showLegend && chartLines.push(...this.renderInvestmentTooltip());

		chartAccessors.map((accessor, idx) => {
			chartLines.push(
				<LineSeries
					key={accessor + "_line"}
					yAccessor={getYAccessor(accessor, principalPostfix)}
					stroke={this.color(accessor)}
				/>
			);
			chartLines.push(
				<CurrentCoordinate
					key={accessor + "_coord"}
					yAccessor={getYAccessor(accessor, principalPostfix)}
					fill={this.color(accessor)}
				/>
			);
			showLegend && chartLines.push(
				<SingleValueTooltip
					key={accessor + "_tooltip"}
					className="legend"
					yLabel={accessor}
					yAccessor={getYAccessor(accessor, principalPostfix)}
					yDisplayFormat={val => "$" + moneyF(val)}
					origin={this.getLegendOrigins("line2", accessor + "_tooltip")}
					labelStroke="#C3C3C3"
					valueStroke={this.color(accessor)}
				/>
			);
			showRightIndicatorsFor && !!~showRightIndicatorsFor.indexOf(accessor) && chartLines.push(
				<EdgeIndicator
					key={accessor + "_edge"}
					itemType="last"
					orient="right"
					edgeAt="right"
					yAccessor={getYAccessor(accessor, principalPostfix)}
					displayFormat={moneyF}
					fill={this.color(accessor)}
					rectWidth={80}
				/>
			);
		});

		if (highField && lowField) {
			chartLines.push(
				<AreaOnlySeries
					key="area_only_series"
					yAccessor={getYAccessor(highField, principalPostfix)}
					base={(scale, d) => {
						return scale(getYAccessor(highField, principalPostfix)(d) && getYAccessor(lowField, principalPostfix)(d));
					}}
					opacity={0.25}
					stroke="transparent"
					fill={this.color(portfolioField)}
				/>
			);
		}

		if (rebalancedField) {
			chartLines.push(
				<ScatterSeries
					key="rebalanced_scatter_series"
					yAccessor={d => {
						if (d[rebalancedField]) {
							return d[portfolioField + principalPostfix];
						}
					}}
					marker={CircleMarker}
					markerProps={{
						r: 3,
						stroke: this.color(this.getRebalancedLabel()),
						fill: this.color(this.getRebalancedLabel())
					}}
				/>
			);
		}

		if (investmentAmount) {
			chartLines.push(
				<ScatterSeries
					key="investment_scatter_series"
					yAccessor={d => {
						if (d[investmentAmountApplied]) {
							return d[portfolioField + principalPostfix];
						}
					}}
					marker={CircleMarker}
					markerProps={{
						r: 3,
						stroke: this.color(this.getInvestmentFrequencyLabel()),
						fill: this.color(this.getInvestmentFrequencyLabel())
					}}
				/>
			);
		}

		return chartLines;
	}

	renderHoverTooltip() {
		let {rebalancedField, investmentAmount, investmentFrequency} = this.props;
		let {chartAccessors} = this.state;
		return (
			<HoverTooltip
				chartId={1}
				bgwidth={0}
				bgheight={0}
				fill="#26252D"
				fontFill="#C3C3C3"
				stroke="#C3C3C3"
				opacity={0.75}
				yAccessor={(d) => {
					let max = 0;
					let min = 0;
					chartAccessors.map(accessor => {
						let value = getYAccessor(accessor, principalPostfix)(d);
						if (value) {
							max = Math.max(value, max);
							min || (min = max);
							min = Math.min(value, min);
						}
					});
					if (max && min) {
						return Math.round(((max - min) / 2) + min);
					}
					return max || min;
				}}
				tooltipContent={({currentItem, xAccessor}) => {
					let tooltipContentArr = [];
					if (rebalancedField) {
						tooltipContentArr.push({
							label: this.getRebalancedLabel(),
							value: currentItem[rebalancedField] ? "Yes" : "No"
						});
					}
					if (investmentAmount) {
						tooltipContentArr.push({
							label: this.getInvestmentFrequencyLabel(),
							value: currentItem[investmentAmountApplied] ? "$" + moneyF(investmentAmount) : "$0"
						});
					}
					tooltipContentArr.push(...chartAccessors.map(accessor => {
						let value = getYAccessor(accessor, principalPostfix)(currentItem);
						return {
							label: accessor,
							value: value ? "$" + moneyF(value) : null
						}
					}).filter(item => item.value));
					return {
						x: dateF(xAccessor(currentItem)),
						y: tooltipContentArr
					};
				}}
				tooltipCanvas={(props, content, ctx) => {
					const X = 10;
					const Y = 10;

					let {fontFamily, fontSize, fontFill} = props;

					let startY = Y + fontSize * 0.9;
					ctx.font = fontSize + "px " + fontFamily;
					ctx.fillStyle = fontFill;
					ctx.textAlign = "left";
					ctx.fillText(content.x, X, startY);

					for (let i = 0; i < content.y.length; i++) {
						let y = content.y[i];
						let labelText = y.label + ": ";
						let textY = startY + fontSize * (i + 1);
						ctx.fillStyle = y.stroke || fontFill;
						ctx.fillText(labelText, X, textY);

						ctx.fillStyle = this.color(y.label);
						ctx.fillText(y.value, X + ctx.measureText(labelText).width, textY);
					}
				}}
			/>
		);
	}

	getGridWidth() {
		let {width} = this.props;
		let {chartMargin} = this.state;
		let gridWidth = width - chartMargin.left - chartMargin.right;
		return gridWidth;
	}

	getGridHeight() {
		let {height} = this.props;
		let {chartMargin} = this.state;
		let gridHeight = height - chartMargin.top - chartMargin.bottom;
		return gridHeight;
	}

	render() {
		let {
			dateField,
			portfolioField,
			visibleDateRange,
			type,
			height,
			width,
			ratio,
			showGrid,
			showHoverLegend,
			showTopMouseCoordinate,
			showLeftMouseCoordinate
		} = this.props;
		let {chartAccessors, chartData, chartMargin} = this.state;

		let gridHeight = this.getGridHeight();
		let gridWidth = this.getGridWidth();

		let yGrid = showGrid ? {
			innerTickSize: -1 * gridWidth,
			tickStrokeDasharray: 'Solid',
			tickStrokeOpacity: 0.2,
			tickStrokeWidth: 1
		} : {};
		let xGrid = showGrid ? {
			innerTickSize: -1 * gridHeight,
			tickStrokeDasharray: 'Solid',
			tickStrokeOpacity: 0.2,
			tickStrokeWidth: 1
		} : {};

		return (
			<ChartCanvas
				ratio={ratio}
				width={width}
				height={height}
				margin={chartMargin}
				type={type}
				pointsPerPxThreshold={1}
				seriesName={portfolioField}
				data={chartData}
				xAccessor={d => d[dateField]}
				xScale={d3.scaleTime()}
				xExtents={visibleDateRange}
			>
				<Chart
					id={1}
					yScale={d3.scaleLinear()}
					yExtents={d => chartAccessors.map(accessor => getYAccessor(accessor, principalPostfix)(d))}
				>
					<XAxis axisAt="bottom" orient="bottom" tickStroke="#FFFFFF" stroke="#FFFFFF" opacity={0.2} {...xGrid}/>
					<Label
						x={gridWidth / 2}
						y={gridHeight + (chartMargin.bottom / 2) + 12}
						fill="#C3C3C3"
						text="Investment Duration"
					/>

					<YAxis axisAt="left" orient="left" tickStroke="#FFFFFF" stroke="#FFFFFF" opacity={0.2} {...yGrid}/>
					<Label
						x={0 - (chartMargin.left / 2)}
						y={gridHeight / 2}
						rotate={-90}
						fill="#C3C3C3"
						text="Monetary Value"
					/>

					{
						showTopMouseCoordinate ?
							<MouseCoordinateX
								at="top"
								orient="top"
								displayFormat={dateF}
								rectWidth={100}
							/> : null
					}
					{
						showLeftMouseCoordinate ?
							<MouseCoordinateY
								at="left"
								orient="left"
								displayFormat={moneyF}
								rectWidth={80}
							/> : null
					}

					<Annotate
						with={SvgPathAnnotation}
						when={d => d[firstProjectedField]}
						usingProps={{
							y: ({yScale, plotData, datum}) => {
								return yScale(datum[principalPostfix]);
							},
							stroke: "#FFFFFF",
							opacity: 0.5,
							path: ({x, y}) => {
								return "M" + x + " " + y + " L" + x + " 0" + " L" + x + " " + gridHeight;
							}
						}}
					/>
					{this.renderChartLines()}
				</Chart>
				<CrossHairCursor/>
				{showHoverLegend ? this.renderHoverTooltip() : ""}
			</ChartCanvas>

		);
	}
}

LineChart = fitWidth(LineChart);

export default class PortfolioChart extends AbstractChart {
	static propTypes = {
		historical: PropTypes.array,
		projected: PropTypes.array,
		timeFrame: PropTypes.number,

		colorScheme: PropTypes.oneOf(Object.keys(ColorSchemes)),
		dateField: PropTypes.string,
		rebalancedField: PropTypes.string,
		portfolioField: PropTypes.string,
		highField: PropTypes.string,
		lowField: PropTypes.string,
		principal: PropTypes.number,
		investmentFrequency: PropTypes.oneOf(["Monthly", "Yearly"]),
		investmentAmount: PropTypes.number,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		showLegend: PropTypes.bool,
		showHoverLegend: PropTypes.bool,
		showTopMouseCoordinate: PropTypes.bool,
		showLeftMouseCoordinate: PropTypes.bool,
		showRightIndicatorsFor: PropTypes.array,
		height: PropTypes.number,
		margin: PropTypes.shape({
			top: PropTypes.number,
			right: PropTypes.number,
			bottom: PropTypes.number,
			left: PropTypes.number
		})
	};

	static defaultProps = {
		historical: [],
		projected: [],
		timeFrame: 12,

		colorScheme: "dark2",
		dateField: "_date",
		rebalancedField: "_rebalanced",
		portfolioField: "Portfolio",
		highField: "High",
		lowField: "Low",
		principal: 1.00,
		investmentFrequency: "Monthly",
		investmentAmount: 0.00,
		startDate: "",
		endDate: "",
		showLegend: true,
		showHoverLegend: true,
		showTopMouseCoordinate: true,
		showLeftMouseCoordinate: true,
		showRightIndicatorsFor: [],
		height: 400,
		margin: {left: 100, right: 100, top: 15, bottom: 50}
	};

	constructor(props) {
		super(props, "PortfolioChart");
	}

	getTimeFrame() {
		let {dateField, historical, projected, timeFrame} = this.props;
		if (historical && historical.length && projected && projected.length) {
			let startDate = dateP(historical[historical.length - 1][dateField]);
			startDate.setMonth(startDate.getMonth() - timeFrame);
			startDate.setDate(1);

			let endDate = dateP(projected[0][dateField]);
			endDate.setMonth(endDate.getMonth() + timeFrame);
			endDate.setDate(1);
			return [startDate, endDate];
		}
		return [new Date(), new Date()];
	}

	render() {
		let {historical, projected, timeFrame, height, ...others} = this.props;
		if (historical && historical.length && projected && projected.length) {
			return (
				<Frame className="portfolio-chart" style={{height: (height + 20) + "px"}}>
					<LineChart
						historicalData={historical}
						projectedData={projected}
						visibleDateRange={this.getTimeFrame()}
						height={height}
						{...others}
					/>
				</Frame>
			);
		}
		return null;
	}

}


