import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './DeletableItem.scss';

export default class DeletableItem extends Component {
	static propTypes = {
		name: PropTypes.string,
		value: PropTypes.string,
		onDelete: PropTypes.func
	};

	static defaultProps = {
		name: "",
		value: "",
		onDelete: () => {}
	};

	render() {
		let {name, value, onDelete} = this.props;
		return (
			<div className="deletable-item">
				<span className="delete-icon" onClick={onDelete.bind(this, value)}>&#10754;</span>
				<div className="item-title">{name}</div>
			</div>
		);
	}
}

