import React from 'react';
import PropTypes from 'prop-types';

import AbstractLabelledInput from '../abstracts/AbstractLabelledInput';

import '../abstracts/AbstractLabelledInput.scss';
import './TextBox.scss';

const formatNumber = (value) => {
	value = value || 0;
	return value.toFixed(2);
};

const formatCurrency = (value, locale = "en-US") => {
	return value.toLocaleString(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2});
};

export default class TextBox extends AbstractLabelledInput {
	static propTypes = {
		...AbstractLabelledInput.propTypes,
		invalidValueMessage: PropTypes.string
	};

	static defaultProps = {
		...AbstractLabelledInput.defaultProps,
		value: "",
		invalidValueMessage: "Please enter a valid value",
		onChange: () => {}
	};

	onChange(evt) {
		let {value} = evt.target;
		let {onChange} = this.props;
		this.setState({value});
		onChange(evt);
	}

	isReadOnly() {
		let {readOnly} = this.props;
		return !!readOnly;
	}

	renderInputField() {
		let {onValueChange, invalidValueMessage, label, ...others} = this.props;
		let {value} = this.state;
		if (this.isReadOnly()) {
			return (<input {...others} value={value}/>);
		} else {
			return (
				<input
					{...others}
					value={value}
					onChange={::this.onChange}
				/>
			);
		}
	}

	renderErrorMessage() {
		if (!this.isReadOnly()) {
			let {invalidValueMessage} = this.props;
			return (<span className="error-message">{invalidValueMessage}</span>);
		}
	}

	render() {
		return (
			<div className="text-box">
				{
					this.renderLabelledInput(
						<span className={this.getClassNames().join(" ")}>
							{this.renderInputField()}
							{this.renderErrorMessage()}
						</span>
					)
				}
			</div>
		);
	}
}

export class NumericBox extends TextBox {
	static nonNumericCharsRE = /[^0-9.-]+/g;

	static propTypes = {
		...TextBox.propTypes,
		value: PropTypes.number,
		valueFormatter: PropTypes.func,
		incrementBy: PropTypes.number
	};

	static defaultProps = {
		...TextBox.defaultProps,
		value: 0,
		pattern: "^[0-9,-]+([.][0-9]{1,2})?$",
		incrementBy: 1,
		valueFormatter: formatNumber,
		onFocus: () => {},
		onBlur: () => {},
		onKeyDown: () => {}
	};

	state = {
		value: this.props.value,
		textValue: this.props.valueFormatter(this.props.value)
	};

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps.apply(this, arguments);
		let {valueFormatter} = nextProps;
		let {value} = this.state;
		if (nextProps.value !== value) {
			this.setState({
				textValue: valueFormatter(nextProps.value)
			});
		}
	}

	getClassNames() {
		let classNames = super.getClassNames();
		classNames.push("numeric-box");
		return classNames;
	}

	parse(valueStr) {
		let {pattern} = this.props;
		let {value} = this.state;
		let r = new RegExp(pattern, "ig");
		if (!valueStr) {
			valueStr = "0";
		}
		if (valueStr.match(r)) {
			value = parseFloat(Number(valueStr.replace(NumericBox.nonNumericCharsRE, "")));
		}
		return value;
	}

	processValue() {
		let {valueFormatter} = this.props;
		let {textValue} = this.state;
		let value = this.parse(textValue);
		this.setState({
			value,
			textValue: valueFormatter(value)
		});
	}

	onChange(evt) {
		let {onChange} = this.props;
		this.setState({textValue: evt.target.value});
		onChange(evt);
	}

	onFocus(evt) {
		let {onFocus} = this.props;
		this.processValue();
		onFocus(evt);
	}

	onBlur(evt) {
		let {onBlur} = this.props;
		this.processValue();
		onBlur(evt);
	}

	onKeyDown(evt) {
		let {onKeyDown, incrementBy, valueFormatter} = this.props;
		if (evt.key === "Enter") {
			this.onBlur();
		} else if (evt.key === "ArrowUp") {
			let {value} = this.state;
			value += incrementBy;
			let textValue = valueFormatter(value);
			this.setState({value, textValue});
		} else if (evt.key === "ArrowDown") {
			let {value} = this.state;
			value -= incrementBy;
			let textValue = valueFormatter(value);
			this.setState({value, textValue});
		}
		onKeyDown(evt);
	}

	renderInputField() {
		let {onValueChange, invalidValueMessage, incrementBy, valueFormatter, label, ...others} = this.props;
		let {textValue} = this.state;
		if (this.isReadOnly()) {
			return (<input {...others} value={textValue}/>);
		} else {
			return (
				<input
					{...others}
					value={textValue}
					onChange={::this.onChange}
					onFocus={::this.onFocus}
					onBlur={::this.onBlur}
					onKeyDown={::this.onKeyDown}
				/>
			);
		}
	}
}

export class MoneyBox extends NumericBox {
	static defaultProps = {
		...NumericBox.defaultProps,
		valueFormatter: formatCurrency
	};

	getClassNames() {
		let classNames = super.getClassNames();
		classNames.push("money-box");
		return classNames;
	}
}

export class PercentBox extends NumericBox {
	static defaultProps = {
		...NumericBox.defaultProps,
		pattern: "^-?([0-9]{1,2}([\.][0-9]{1,2})?$|100([\.][0]{1,2})?)?$"
	};

	getClassNames() {
		let classNames = super.getClassNames();
		classNames.push("percent-box");
		return classNames;
	}
}

export class NeonNumericBox extends NumericBox {
	isNeon() {
		return true;
	}
}

export class NeonTextBox extends TextBox {
	isNeon() {
		return true;
	}
}

export class NeonMoneyBox extends MoneyBox {
	isNeon() {
		return true;
	}
}

export class NeonPercentBox extends PercentBox {
	isNeon() {
		return true;
	}
}
