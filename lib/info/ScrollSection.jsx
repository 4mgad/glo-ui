import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './ScrollSection.scss';

export default class ScrollSection extends Component {
	static propTypes = {
		height: PropTypes.number
	};

	static defaultProps = {
		height: 200
	};

	render() {
		return (
			<div className="scroll-section" style={this.props}>
				{this.props.children}
			</div>
		);
	}
}
