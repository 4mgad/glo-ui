import React, {Component} from 'react';

/**
 * Provides abstract functionality that most charts need.
 */
export default class AbstractChart extends Component {
	static id = 0;

	constructor(props, chartType) {
		super(props);
		chartType = chartType || "AbstractChart";
		this.elementId = chartType + "_" + AbstractChart.id++;
	}

	render() {}
}
