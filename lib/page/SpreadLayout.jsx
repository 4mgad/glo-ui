import React, {Component} from 'react';
import PropTypes from 'prop-types';

import "./SpreadLayout.scss";

export default class SpreadLayout extends Component {
	static propTypes = {
		cellsPerRow: PropTypes.number
	};

	static defaultProps = {
		cellsPerRow: 1
	};

	render() {
		let {cellsPerRow, children} = this.props;
		let numOfRows = Math.ceil(children.length / cellsPerRow);
		let rowsArr = [];
		let idx = 0;
		for (let i = 0; i < numOfRows; i++) {
			let colsArr = [];
			for (let j = 0; j < cellsPerRow; j++) {
				colsArr.push(
					<div key={j} className="col">
						{children[idx++]}
					</div>
				);
			}
			rowsArr.push(
				<div key={i} className="row">
					{colsArr}
				</div>
			);
		}
		return (
			<div className="spread-layout">
				{rowsArr}
			</div>
		);
	}
}
