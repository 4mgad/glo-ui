import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './VoyageStation.scss';

export default class VoyageStation extends Component {

	static propTypes = {
		name: PropTypes.string,
		value: PropTypes.string
	};

	static defaultProps = {
		name: "",
		value: ""
	};

	render() {
		let {children} = this.props;
		return (
			<div className="voyage-station">
				{children}
			</div>
		);
	}
}

