import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './TooltipPopup.scss';

export default class TooltipPopup extends Component {

	static propTypes = {
		show: PropTypes.bool,
		position: PropTypes.object
	};

	static defaultProps = {
		show: false,
		position: {
			top: -1000,
			left: -1000
		}
	};

	render() {
		let {id, children, show, position, onMouseOver, onMouseLeave} = this.props;
		if (show) {
			return (
				<div
					id={id}
					className="popup-box arrow-down"
					style={position}
					onMouseOver={onMouseOver}
					onMouseLeave={onMouseLeave}
				>
					<div className="tooltip-popup">
						{children}
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

