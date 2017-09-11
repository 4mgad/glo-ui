import React from 'react';
import PropTypes from 'prop-types';

import AbstractValueObserver from './AbstractValueObserver';

/**
 * Provides abstract functionality that most labelled inputs need.
 * It wraps input fields with a labelled frame.
 */
export default class AbstractLabelledInput extends AbstractValueObserver {
	static propTypes = {
		...AbstractValueObserver.propTypes,
		/** The label to display on the top left corner of the frame */
		label: PropTypes.string
	};

	static defaultProps = {
		...AbstractValueObserver.defaultProps,
		label: ""
	};

	state = {
		...this.state
	};

	isNeon() {
		return false;
	}

	isLabelled() {
		let {label} = this.props;
		return !!label;
	}

	getClassNames() {
		let classNames = ["input"];
		let {className} = this.props;
		if (className) {
			classNames.push(...className.split(" "));
		}
		if (!this.isLabelled() && this.isNeon()) {
			classNames.push("gradient-border");
		}
		return classNames;
	}

	/**
	 * Wrap inputComp in a labelled frame.
	 *
	 * @param {Component} inputComp
	 * @public
	 */
	renderLabelledInput(inputComp) {
		let {id, label} = this.props;
		if (label) {
			let classNames = ["labelled-input"];
			if (this.isNeon()) {
				classNames.push("gradient-border");
			}
			return (
				<label className={classNames.join(" ")} htmlFor={id || ""}>
					<span className="top-label" title={label}>{label}</span>
					{inputComp}
				</label>
			);
		} else {
			return inputComp;
		}
	}

	render() {}
}
