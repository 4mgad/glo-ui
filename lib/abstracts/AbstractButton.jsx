import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './AbstractButton.scss';

/**
 * Provides abstract functionality that most buttons need.
 */
export default class AbstractButton extends Component {

	static propTypes = {
		/**
		 * Button label
		 */
		title: PropTypes.string.isRequired,

		/**
		 * Primary button or not
		 */
		primary: PropTypes.bool
	};

	static defaultProps = {
		title: "",
		primary: true
	};

	getClassNames() {
		let classNames = ["abstract-button"];
		let {primary} = this.props;
		if (primary) {
			classNames.push("primary");
		}
		return classNames;
	}

	render() {
		let {primary, title, ...other} = this.props;
		return (
			<button {...other} className={this.getClassNames().join(" ")}>
				{title}
			</button>
		);
	}
}
