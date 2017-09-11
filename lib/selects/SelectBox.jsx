import React, {Component} from 'react';
import PropTypes from 'prop-types';

import g from '../../globals/g';

import SmallButton from '../buttons/SmallButton';
import MultiSelect from '../lists/MultiSelect';

import './SelectBox.scss';

export default class SelectBox extends Component {
	static propTypes = {
		name: PropTypes.string,
		value: PropTypes.string,
		items: PropTypes.array,
		onChange: PropTypes.func
	};

	static defaultProps = {
		name: "",
		value: "",
		items: [],
		onChange: () => {}
	};

	onOKClick() {
		let selectedItems = this.getSelectedItems();
		let serSelectedItems = JSON.stringify(selectedItems);
		if (serSelectedItems !== this._serSelectedItems) {
			this.props.onChange(selectedItems);
		}
		g.hideMessage();
	}

	getSelectedItems() {
		let {items} = this.props;
		return items.filter(({selected}) => (selected));
	}

	showItemsPopup() {
		let {name, items} = this.props;
		this._serSelectedItems = JSON.stringify(this.getSelectedItems());
		g.showMessage({
			title: name,
			className: "select-box",
			content: (
				<MultiSelect
					selectable={true}
					items={items}
				/>
			),
			buttons: [
				<SmallButton key="doneBtn" title="OK" onClick={::this.onOKClick}/>
			]
		});
	}

	onBoxClick(evt) {
		evt.stopPropagation();
		this.showItemsPopup();
	}

	render() {
		let {name, items} = this.props;
		let selectedItems = this.getSelectedItems();

		let allSign = (<span className="sign all">&#x2713;</span>);//all
		let someSign = (<span className="sign some">&#x2713;</span>);//some
		let noneSign = (<span className="sign none">&#8722;</span>);//none

		let sign = noneSign;
		if (selectedItems.length) {
			sign = someSign;
		}
		if (selectedItems.length >= items.length) {
			sign = allSign;
		}

		let classNames = ["select-box", "gradient-border"];
		return (
			<div className={classNames.join(" ")} onClick={::this.onBoxClick}>
				{sign}
				<span className="item">{name}</span>
			</div>
		);
	}
}
