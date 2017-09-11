import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AbstractValueObserver from '../abstracts/AbstractValueObserver';

import './RangeSlider.scss';

export default class RangeSlider extends AbstractValueObserver {
	static id = 0;

	static propTypes = {
		...AbstractValueObserver.propTypes,
		min: PropTypes.number,
		minLabel: PropTypes.string,
		minLabelFunc: PropTypes.func,
		minColor: PropTypes.string,
		max: PropTypes.number,
		maxLabel: PropTypes.string,
		maxLabelFunc: PropTypes.func,
		maxColor: PropTypes.string,
		value: PropTypes.number,
		valueLabel: PropTypes.string,
		valueLabelFunc: PropTypes.func,
		vertical: PropTypes.bool
	};

	static defaultProps = {
		...AbstractValueObserver.defaultProps,
		min: 0,
		minLabel: "",
		minColor: "#1672F6",
		max: 100,
		maxLabel: "",
		maxColor: "#F70E1D",
		value: 50,
		valueLabel: "",
		vertical: false
	};

	state = {
		...this.state,
		min: 0,
		max: 100,
		capture: false
	};

	constructor(props) {
		super(props);
		this.elementId = "RangeSlider_" + RangeSlider.id++;
	}

	componentDidMount() {
		let {min, max, value} = this.props;
		this.setState({min, max, value});
	}

	componentWillReceiveProps(nextProps) {
		let {min, max, value} = nextProps;
		this.setState({min, max, value});
	}

	getMinLabel() {
		let {minLabelFunc, minLabel} = this.props;
		if (minLabelFunc && typeof minLabelFunc === "function") {
			return minLabelFunc(this.state);
		} else {
			return minLabel || (this.state.min + " (0%)");
		}
	}

	getMaxLabel() {
		let {maxLabelFunc, maxLabel} = this.props;
		if (maxLabelFunc && typeof maxLabelFunc === "function") {
			return maxLabelFunc(this.state);
		} else {
			return maxLabel || (this.state.max + " (100%)");
		}
	}

	getValueLabel() {
		let {valueLabelFunc, valueLabel} = this.props;
		if (valueLabelFunc && typeof valueLabelFunc === "function") {
			return valueLabelFunc(this.state);
		} else {
			return valueLabel || (this.state.value + " (" + this.getPercentageLabel() + ")");
		}
	}

	getPercentage() {
		let {min, max, value} = this.state;
		let percentage = (value - min) / (max - min);
		return percentage >= 0 ? percentage : 0;
	}

	getPercentageLabel() {
		return (this.getPercentage() * 100).toFixed(2) + "%";
	}

	getPositionWithinRange() {
		let pos = 0;
		let rangeElement = document.querySelector("#" + this.elementId);
		if (rangeElement) {
			let {vertical} = this.props;
			let rangeRect = rangeElement.getBoundingClientRect();
			let {width, height} = rangeRect;
			let percentage = this.getPercentage();
			pos = vertical ? height - (height * percentage) : width * percentage;
		}
		return pos;
	}

	getSliderPosition() {
		let pos = -10000;
		let sliderElement = document.querySelector("#" + this.elementId + " .slider");
		if (sliderElement) {
			let {vertical} = this.props;
			let sliderRect = sliderElement.getBoundingClientRect();
			let {width, height} = sliderRect;
			let posWithinRange = this.getPositionWithinRange();
			pos = vertical ? posWithinRange - (height / 2) : posWithinRange - (width / 2);
		}
		return pos;
	}

	setSliderPosition(offsetX, offsetY) {
		let rangeElement = document.querySelector("#" + this.elementId);
		if (rangeElement) {
			let {vertical} = this.props;
			let sliderRect = rangeElement.getBoundingClientRect();
			let {width, height} = sliderRect;
			if (vertical) {
				if (offsetY && height && offsetY > 0 && height > 0) {
					let {max} = this.props;
					let percentage = (height - offsetY) / height;
					let value = Math.ceil(percentage * max);
					this.setState({value});
				}
			} else {
				if (offsetX && width && offsetX > 0 && width > 0) {
					let {max} = this.props;
					let percentage = offsetX / width;
					let value = Math.ceil(percentage * max);
					this.setState({value});
				}
			}
		}
	}

	onRangeClick(evt) {
		let {offsetX, offsetY} = evt.nativeEvent;
		this.setSliderPosition(offsetX, offsetY);
	}

	startCapture() {
		this.setState({capture: true});
	}

	stopCapture() {
		this.setState({capture: false});
	}

	onRangeHover(evt) {
		let {capture} = this.state;
		if (capture) {
			let {offsetX, offsetY} = evt.nativeEvent;
			this.setSliderPosition(offsetX, offsetY);
		}
	}

	render() {
		let {minColor, maxColor, vertical} = this.props;
		let {capture} = this.state;
		let pos = this.getSliderPosition();

		let gradientDirection = vertical ? "top" : "right";
		let slideDirection = vertical ? "top" : "left";

		let classNames = ["range-slider"];

		if (vertical) {
			classNames.push("vertical");
		}
		if (capture) {
			classNames.push("tracking");
		}

		let styleObj = {};
		styleObj[slideDirection] = pos;

		return (
			<div
				id={this.elementId}
				className={classNames.join(" ")}
				style={{
					"background": "linear-gradient(to " + gradientDirection + ", " + minColor + ", " + maxColor + ")"
				}}
				onClick={this.onRangeClick.bind(this)}
				onMouseDown={this.startCapture.bind(this)}
				onMouseUp={this.stopCapture.bind(this)}
				onMouseLeave={this.stopCapture.bind(this)}
				onMouseMove={this.onRangeHover.bind(this)}
			>
				<div
					className="slider"
					style={styleObj}
				>
					<div className="value-label">
						{this.getValueLabel()}
					</div>
				</div>
				<div className="min-label">{this.getMinLabel()}</div>
				<div className="max-label">{this.getMaxLabel()}</div>
			</div>
		);
	}

}
