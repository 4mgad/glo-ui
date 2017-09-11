import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './AutoComplete.scss';

class ListItem extends Component {
	static propTypes = {
		item: PropTypes.object,
		onItemSelect: PropTypes.func
	};

	static defaultProps = {
		item: {
			name: "",
			value: ""
		},
		onItemSelect: () => {}
	};

	onItemClick(item) {
		this.props.onItemSelect(item);
	}

	render() {
		let {item} = this.props;
		return (
			<li className="item" onClick={this.onItemClick.bind(this, item)}>{item["name"]}</li>
		);
	}
}

class ListItems extends Component {
	static propTypes = {
		show: PropTypes.bool,
		items: PropTypes.array,
		onItemSelect: PropTypes.func
	};

	static defaultProps = {
		show: false,
		items: [],
		onItemSelect: () => {}
	};

	state = {
		show: this.props.show
	};

	render() {
		let {show, items, onItemSelect} = this.props;
		if (show && items.length) {
			return (
				<div className="popup-box arrow-up items-list-wrapper">
					<ul className="items-list">
						{items.map((item, idx) => (<ListItem onItemSelect={onItemSelect} key={idx} item={item}/>))}
					</ul>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default class AutoComplete extends Component {
	static id = 0;

	static propTypes = {
		items: PropTypes.array,
		hideOnSelect: PropTypes.bool,
		onChange: PropTypes.func,
		onItemSelect: PropTypes.func
	};

	static defaultProps = {
		items: [],
		hideOnSelect: false,
		onChange: () => {},
		onItemSelect: () => {}
	};

	constructor(props) {
		super(props);
		this.elementId = "AutoComplete_" + AutoComplete.id++;
	}

	state = {
		value: "",
		showListItems: false
	};

	componentWillUnmount() {
		if (this._valueChangeTimer) {
			clearTimeout(this._valueChangeTimer);
			delete this._valueChangeTimer;
		}
		if (this._blurTimer) {
			clearTimeout(this._blurTimer);
			delete this._blurTimer;
		}
		this.hideListItems();
	}

	onValueChange(evt) {
		let {value} = evt.target;
		this.setState({
			value
		});
		if (this._valueChangeTimer) {
			clearTimeout(this._valueChangeTimer);
			delete this._valueChangeTimer;
		}
		this._valueChangeTimer = setTimeout(() => {
			this.props.onChange(value);
			this.showListItems();
			delete this._valueChangeTimer;
		}, 500);
	}

	showListItems() {
		let {value} = this.state;
		this.setState({
			showListItems: value ? true : false
		});
	}

	hideListItems() {
		this.setState({
			showListItems: false
		});
	}

	onFocus() {
		if (this._blurTimer) {
			clearTimeout(this._blurTimer);
			delete this._blurTimer;
		}
		let itemSelected = this._itemSelected;
		this._itemSelected = false;
		if (itemSelected && this.props.hideOnSelect) {
			this.hideListItems();
		} else {
			this.showListItems();
		}
	}

	onBlur() {
		this._blurTimer = setTimeout(() => {
			let itemSelected = this._itemSelected;
			this._itemSelected = false;
			if (!itemSelected) {
				this.hideListItems();
			}
		}, 300);
	}

	onItemSelect(item) {
		this.props.onItemSelect(item);
		this._itemSelected = true;
		let inputElement = document.querySelector("#" + this.elementId + " input");
		if (inputElement) {
			inputElement.focus();
		}
	}

	render() {
		let classNames = ["input", "auto-complete"];
		let {items, hideOnSelect, onChange, onItemSelect, ...other} = this.props;
		let {value} = this.state;
		let re = new RegExp(value, "ig");
		let filteredItems = [];
		items.map(item => {
			if (item["name"].match(re)) {
				filteredItems.push(item);
			}
		});
		return (
			<span id={this.elementId} className={classNames.join(" ")}>
				<input
					{...other}
					value={value}
					onChange={::this.onValueChange}
					onFocus={::this.onFocus}
					onClick={::this.onFocus}
					onBlur={::this.onBlur}
				/>
				<ListItems
					show={this.state.showListItems}
					items={filteredItems}
					onItemSelect={::this.onItemSelect}
				/>
			</span>
		);
	}
}
