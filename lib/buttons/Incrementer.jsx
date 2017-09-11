import React from 'react';
import PropTypes from 'prop-types';

import AbstractValueObserver from '../abstracts/AbstractValueObserver';

import './Incrementer.scss';

export default class Incrementer extends AbstractValueObserver {
	static propTypes = {
		...AbstractValueObserver.propTypes,
		value: PropTypes.number,
		min: PropTypes.number,
		max: PropTypes.number
	};

	static defaultProps = {
		...AbstractValueObserver.defaultProps,
		value: 0,
		min: 0,
		max: 100
	};

	incrementValue(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		let {max} = this.props;
		let {value} = this.state;
		if (value < max) {
			value++;
			this.setState({value});
		}
	}

	decrementValue(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		let {min} = this.props;
		let {value} = this.state;
		if (value > min) {
			value--;
			this.setState({value});
		}
	}

	render() {
		let {min, max, onValueChange, ...others} = this.props;
		let buttonContainerClasses = ["input", "gradient-border", "controllers"];
		let buttonStyles = {
			display: "inline-block"
		};
		return (
			<div className="incrementer">
				<input
					{...others}
					size={(max + "").length}
					className="value-label"
					type="text"
					readOnly={true}
					value={this.state.value}
				/>
				<div className={buttonContainerClasses.join(" ")} style={ buttonStyles }>
					<span className="controller" onClick={::this.incrementValue}>&#43;</span>
					<span className="controller" onClick={::this.decrementValue}>&#8722;</span>
				</div>
			</div>
		);
	}


}
