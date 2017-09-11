import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './TripProgressBar.scss';

class TripStation extends Component {

	static propTypes = {
		name: PropTypes.string,
		value: PropTypes.string,
		active: PropTypes.bool,
		onClick: PropTypes.func
	};

	static defaultProps = {
		name: "",
		value: "",
		active: false,
		onClick: () => {}
	};

	handleClick() {
		let {onClick, value} = this.props;
		if (onClick) {
			onClick(value);
		}
	}

	render() {
		let {active, name} = this.props;
		let classNames = ["trip-station"];
		if (active) {
			classNames.push("active");
		}
		return (
			<span className={classNames.join(" ")} onClick={::this.handleClick}>
				<span className="line"></span>
				<span className="symbol"></span>
				<span className="title">&nbsp;{name}&nbsp;</span>
			</span>
		);
	}

}

export default class TripProgressBar extends Component {

	static propTypes = {
		items: PropTypes.array,
		values: PropTypes.array
	};

	static defaultProps = {
		items: [],
		values: []
	};

	handleClick(idx, value) {
		let {onClick} = this.props;
		if (onClick) {
			onClick(value, idx);
		}
	}

	render() {
		let {items, values, onClick} = this.props;
		return (
			<div className="trip">
				{
					items.map(({name, value}, idx) => <TripStation
						key={idx}
						onClick={this.handleClick.bind(this, idx)}
						name={name}
						value={value}
						active={!!~values.indexOf(value)}
					/>)
				}
			</div>
		);
	}

}
