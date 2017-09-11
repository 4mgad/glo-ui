import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './StackedLinks.scss';

export default class StackedLinks extends Component {
	static propTypes = {
		items: PropTypes.array,
		onItemClick: PropTypes.func
	};

	static defaultProps = {
		items: [],
		onItemClick: () => {}
	};

	render() {
		let {items, onItemClick, ...others} = this.props;
		return (
			<ul className="list-input">
				{
					items.map((item, i) => (
						<li key={i}>
							<span
								{...others}
								onClick={() => {onItemClick(item)}}
							>
								{item}
							</span>
						</li>
					))
				}
			</ul>
		);
	}
}
