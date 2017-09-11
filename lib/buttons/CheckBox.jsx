import React from 'react';
import PropTypes from 'prop-types';

import AbstractValueObserver from '../abstracts/AbstractValueObserver';

import './CheckBox.scss';

/**
 * CheckBox
 */
export default class CheckBox extends AbstractValueObserver {
	static propTypes = {
		...AbstractValueObserver.propTypes,
		name: PropTypes.string,
		value: PropTypes.bool,
		onSelect: PropTypes.func,
		onUnSelect: PropTypes.func
	};

	static defaultProps = {
		...AbstractValueObserver.defaultProps,
		name: "",
		value: false,
		onSelect: () => {},
		onUnSelect: () => {}
	};

	componentDidUpdate(prevProps, prevState) {
		super.componentDidUpdate(prevProps, prevState);
		let {onSelect, onUnSelect} = this.props;
		let {value} = this.state;
		if (prevState.value !== value) {
			if (value) {
				onSelect(value);
			} else {
				onUnSelect(value);
			}
		}
	}

	onClick() {
		let {value} = this.state;
		this.setState({
			value: !value
		});
	}

	render() {
		let {name, onSelect, onUnSelect, onValueChange, ...others} = this.props;
		let {value} = this.state;
		return (
			<span className="checkbox-container">
				<input
					{...others}
					type="checkbox"
					className="w-checkbox"
					checked={value}
					readOnly={true}
				/>
				<span onClick={::this.onClick}></span>
				<label className="label" onClick={::this.onClick}>{name}</label>
      </span>
		);
	}
}
