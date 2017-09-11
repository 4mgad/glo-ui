import React, {Component} from 'react';
import PropTypes from 'prop-types';

import g from '../../globals/g';

import './TooltipSensor.scss';

const getCoords = (elem) => { // crossbrowser version
	let box = elem.getBoundingClientRect();

	let body = document.body;
	let docEl = document.documentElement;

	let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	let clientTop = docEl.clientTop || body.clientTop || 0;
	let clientLeft = docEl.clientLeft || body.clientLeft || 0;

	let top = box.top + scrollTop - clientTop;
	let left = box.left + scrollLeft - clientLeft;

	return {top: Math.round(top), left: Math.round(left)};
};

export default class TooltipSensor extends Component {

	static id = 0;

	static propTypes = {
		content: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		showDelay: PropTypes.number,
		hideDelay: PropTypes.number
	};

	static defaultProps = {
		content: "",
		showDelay: 500,
		hideDelay: 1000
	};

	constructor(props) {
		super(props);
		this.elementId = "TooltipPopup_" + TooltipSensor.id++;
	}

	showTooltip(evt) {
		if (evt) {
			evt.preventDefault();
			evt.stopPropagation();
		}
		let {content, showDelay, hideDelay} = this.props;
		let position = getCoords(document.getElementById(this.elementId));
		g.showTooltip({content, position, showDelay, hideDelay});
	}

	render() {
		let {children} = this.props;
		return (
			<span id={this.elementId} onMouseOver={::this.showTooltip} className="tooltip-sensor">
				{children}
			</span>
		);
	}
}
