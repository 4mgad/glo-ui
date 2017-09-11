import React from 'react';
import PropTypes from 'prop-types';

import AbstractValueObserver from '../abstracts/AbstractValueObserver';

import './RadioMenu.scss';

export default class RadioMenu extends AbstractValueObserver {
	static propTypes = {
		...AbstractValueObserver.propTypes,
		value: PropTypes.string,
		items: PropTypes.array
	};

	static defaultProps = {
		...AbstractValueObserver.defaultProps,
		value: "",
		items: []
	};

	state = {
		...this.state,
		items: this.props.items
	};

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		this.setState({
			items: this.props.items
		});
	}

	setActive(value) {
		this.setState({value});
	}

	render() {
		let {items, value} = this.state;
		return (
			<div className="gradient-border radio-menu">
				{
					items.map((item, i) => {
						return (
							<div
								key={i}
								className={value == item ? 'menu-item active' : 'menu-item'}
								onClick={this.setActive.bind(this, item)}
							>
								{item}
							</div>
						)
					})
				}
			</div>
		)
	}
}
