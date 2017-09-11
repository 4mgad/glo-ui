import React, {Component} from 'react';
import PropTypes from 'prop-types';

import g from '../../globals/g';

import CheckBox from '../buttons/CheckBox';
import DeletableItem from './DeletableItem';
import TooltipSensor from '../info/TooltipSensor';

import './MultiSelect.scss';

//TODO: provide infinite scrolling for items to improve performance i.e. render visible items only
export default class MultiSelect extends Component {
	static propTypes = {
		items: PropTypes.array,
		min: PropTypes.number,
		max: PropTypes.number,
		selectable: PropTypes.bool,
		onItemSelect: PropTypes.func,
		onItemUnSelect: PropTypes.func,
		onSelectAllItems: PropTypes.func,
		onUnSelectAllItems: PropTypes.func,
		onItemDelete: PropTypes.func,
		onDeleteAllItems: PropTypes.func
	};

	static defaultProps = {
		items: [],
		min: -1,
		max: -1,
		selectable: false,
		onItemSelect: () => {},
		onItemUnSelect: () => {},
		onSelectAllItems: () => {},
		onUnSelectAllItems: () => {},
		onItemDelete: () => {},
		onDeleteAllItems: () => {}
	};

	state = {
		items: this.props.items.slice(0)
	};

	componentWillReceiveProps(nextProps) {
		let {items} = nextProps;
		if (JSON.stringify(this.state.items) !== JSON.stringify(items)) {
			this.setState({
				items: items.slice(0)
			});
		}
	}

	onItemSelect(idx) {
		let {onItemSelect} = this.props;
		let {items} = this.state;
		let item = items[idx];
		item.selected = true;
		this.setState({
			items
		});
		onItemSelect(item);
	}

	onItemUnSelect(idx) {
		let {onItemUnSelect} = this.props;
		let {items} = this.state;
		let item = items[idx];
		item.selected = false;
		this.setState({
			items
		});
		onItemUnSelect(item);
	}

	onItemDelete(idx) {
		g.hideTooltip(true);
		let {onItemDelete} = this.props;
		let {items} = this.state;
		let item = items[idx];
		if (item.selected) {
			this.onItemUnSelect(idx);
		}
		items.splice(idx, 1);
		this.setState({
			items
		});
		onItemDelete(item);
	}

	selectAllItems(selected) {
		let {onSelectAllItems, onUnSelectAllItems} = this.props;
		let {items} = this.state;
		items.map(item => {
			item.selected = selected;
		});
		this.setState({
			items
		});
		if (selected) {
			onSelectAllItems(items);
		} else {
			onUnSelectAllItems(items);
		}
	}

	deleteAllItems() {
		let {onDeleteAllItems} = this.props;
		let {items} = this.state;
		this.selectAllItems(false);
		let delItems = items.splice(0, items.length);
		this.setState({
			items: []
		});
		onDeleteAllItems(delItems);
	}

	getBulkSelectLinks() {
		let {selectable} = this.props;
		if (selectable) {
			return (
				<div className="bulk-select">
					<span className="select-all" onClick={this.selectAllItems.bind(this, true)}>All</span>
					<span className="sep">&#124;</span>
					<span className="select-all" onClick={this.selectAllItems.bind(this, false)}>Clear</span>
				</div>
			);
		} else {
			return (
				<div className="bulk-select">
					<span className="select-all" onClick={::this.deleteAllItems}>Clear</span>
				</div>
			);
		}
	}

	getNumberOfItemsIndicator() {
		let {min, max, selectable} = this.props;
		let {items} = this.state;
		let numOfItems = items.length;
		if (selectable) {
			numOfItems = items.filter((item) => (item.selected)).length;
		}
		let numOfItemsMessage = "";
		if (min > 0 && max > 0) {
			numOfItemsMessage = "Please select between " + min + " and " + max + " items";
			if (numOfItems >= min && numOfItems <= max) {
				numOfItemsMessage = numOfItems + "/" + max;
			}
		} else if (min > 0) {
			numOfItemsMessage = "Please select at least " + min + " items";
			if (numOfItems >= min) {
				numOfItemsMessage = numOfItems;
			}
		} else if (max > 0) {
			numOfItemsMessage = "Please select at most " + max + " items";
			if (numOfItems <= max) {
				numOfItemsMessage = numOfItems;
			}
		}
		return (<div className="num-of-items">{numOfItemsMessage}</div>);
	}

	renderItem(item, idx) {
		let {selectable} = this.props;
		let {name, value, selected, tooltip} = item;
		if (selectable) {
			if (tooltip) {
				return (
					<TooltipSensor content={tooltip} showDelay={0} hideDelay={0}>
						<CheckBox
							key={idx}
							name={name}
							value={selected}
							onSelect={this.onItemSelect.bind(this, idx)}
							onUnSelect={this.onItemUnSelect.bind(this, idx)}
						/>
					</TooltipSensor>
				);
			} else {
				return (
					<CheckBox
						key={idx}
						name={name}
						value={selected}
						onSelect={this.onItemSelect.bind(this, idx)}
						onUnSelect={this.onItemUnSelect.bind(this, idx)}
					/>
				);
			}
		} else {
			if (tooltip) {
				return (
					<TooltipSensor content={tooltip} showDelay={0} hideDelay={0}>
						<DeletableItem
							key={idx}
							name={name}
							value={idx + "_" + value}
							onDelete={this.onItemDelete.bind(this, idx)}
						/>
					</TooltipSensor>
				);
			} else {
				return (
					<DeletableItem
						key={idx}
						name={name}
						value={idx + "_" + value}
						onDelete={this.onItemDelete.bind(this, idx)}
					/>
				);
			}
		}

	}

	render() {
		let {items} = this.state;
		return (
			<div className="multi-select">
				{this.getBulkSelectLinks()}
				<ul className="items-list">
					{
						items.map((item, idx) => (
							<li key={idx} className="item">
								{this.renderItem(item, idx)}
							</li>
						))
					}
				</ul>
				{this.getNumberOfItemsIndicator()}
			</div>
		);
	}
}
