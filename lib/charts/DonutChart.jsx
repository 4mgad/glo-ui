import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";
import AbstractChart from "../abstracts/AbstractChart";

import './DonutChart.scss';

export default class DonutChart extends AbstractChart {
	static propTypes = {
		dataset: PropTypes.array
	};

	static defaultProps = {
		dataset: []
	};

	constructor(props) {
		super(props, "DonutChart");
	}

	componentDidMount() {
		this.charts = d3.select('#' + this.elementId);
		let {width} = document.getElementById(this.elementId).getBoundingClientRect();
		this.chart_m = width / 2 * 0.14;
		this.chart_r = width / 2 * 0.85;
		this.color = d3.scaleOrdinal(d3.schemeCategory20);
		this.create();
	}

	getDataset() {
		let {dataset} = this.props;
		return [{data: dataset}];
	}

	componentDidUpdate() {
		this.charts.selectAll(".donut").data(this.getDataset());
		this.updateDonut();
	}

	create() {
		let donut = this.charts.selectAll('.donut')
			.data(this.getDataset())
			.enter()
			.append('svg:svg')
			.attr('class', 'chart')
			.attr('width', (this.chart_r + this.chart_m) * 2)
			.attr('height', (this.chart_r + this.chart_m) * 2)
			.append('svg:g')
			.attr('class', 'donut')
			.attr('transform', 'translate(' + (this.chart_r + this.chart_m) + ',' + (this.chart_r + this.chart_m) + ')');

		this.charts.append('div').attr('class', 'clear-both');

		this.createCenter();

		this.updateDonut();
	}

	createCenter() {
		let donuts = d3.selectAll('.donut');

		donuts.append("foreignObject")
			.attr("width", this.chart_r)
			.attr("height", this.chart_r)
			.attr('x', 0 - (this.chart_r / 2))
			.attr('y', 0 - (this.chart_r / 2));

		donuts.selectAll('foreignObject')
			.append("xhtml:div")
			.attr('class', 'center-txt')
			.attr('x', 0 - (this.chart_r / 2))
			.attr('y', 0 - (this.chart_r / 2))
			.html("<div class='cat-label'></div><div class='cat-value'></div>");
	}

	setCenterText(label, value) {
		this.charts.selectAll('.cat-label').text(label);
		this.charts.selectAll('.cat-value').text(value);
	}

	pathAnim(path, dir) {
		switch (dir) {
			case 0:
				path.transition()
					.attr('d', d3.arc()
						.innerRadius(this.chart_r * 0.7)
						.outerRadius(this.chart_r)
					);
				break;

			case 1:
				path.transition()
					.attr('d', d3.arc()
						.innerRadius(this.chart_r * 0.7)
						.outerRadius(this.chart_r * 1.08)
					);
				break;
		}
	}

	onMouseOver(d, idx, pathArr) {
		let {data: {cat, val, label}} = d;
		this.pathAnim(d3.select(pathArr[idx]), 1);
		label = label || val;
		this.setCenterText(cat, label);
	}

	onMouseOut(d, idx, pathArr) {
		this.pathAnim(d3.select(pathArr[idx]), 0);
		this.setCenterText("", "");
	}

	updateDonut() {

		let pie = d3.pie()
			.sort(null)
			.value((d) => {
				return d.val;
			});

		let arc = d3.arc()
			.innerRadius(this.chart_r * 0.7)
			.outerRadius(() => {
				return (this.charts.classed('clicked')) ? this.chart_r * 1.08 : this.chart_r;
			});

		// Start joining data with paths
		let paths = this.charts.selectAll('.donut')
			.selectAll('path')
			.data((d) => {
				return pie(d.data);
			});

		paths.attr('d', arc);

		paths
			.enter()
			.append('svg:path')
			.attr('d', arc)
			.style('fill', (d, i) => {
				return this.color(i);
			})
			.on('mouseover', ::this.onMouseOver)
			.on('mouseout', ::this.onMouseOut);

		paths.exit().remove();

		this.setCenterText("", "");
	}

	render() {
		return (
			<div id={this.elementId} className="donut-chart"></div>
		);
	}
}
