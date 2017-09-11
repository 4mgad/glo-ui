import React from 'react';
import PropTypes from 'prop-types';

import AbstractValueObserver from '../abstracts/AbstractValueObserver';

import './Toggle.scss';

export default class Toggle extends AbstractValueObserver {
	static propTypes = {
		...AbstractValueObserver.propTypes,
		on: PropTypes.string,
		off: PropTypes.string,
		value: PropTypes.bool
	};

	static defaultProps = {
		...AbstractValueObserver.defaultProps,
		on: "On",
		off: "Off",
		value: false
	};

	onChange(e) {
		this.setState({value: e.target.checked});
	}

	render() {
		let {on, off, value, onValueChange, ...others} = this.props;
		let classNames = ["switch"];
		let subClassNames = ["slider", "round"];
		return (
			<label className={classNames.join(" ")}>
				<input
					{...others}
					type="checkbox"
					defaultChecked={value}
					onChange={::this.onChange}
				/>
				<div className={subClassNames.join(" ")}>
					<span id="on">{on}</span>
					<span id="off">{off}</span>
				</div>
			</label>
		);
	}
}
