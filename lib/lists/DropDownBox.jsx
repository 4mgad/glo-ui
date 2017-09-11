import React from 'react';
import PropTypes from 'prop-types';

import AbstractLabelledInput from '../abstracts/AbstractLabelledInput';

import '../abstracts/AbstractLabelledInput.scss';
import './DropDownBox.scss';

export default class DropDownBox extends AbstractLabelledInput {
	static propTypes = {
		...AbstractLabelledInput.propTypes,
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		items: PropTypes.arrayOf(PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.shape({
				name: PropTypes.string,
				value: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number
				])
			})
		]))
	};

	static defaultProps = {
		...AbstractLabelledInput.defaultProps,
		value: "",
		items: []
	};

	state = {
		...this.state,
		items: [],
		showDropDown: false,
		filterValues: false,
		textValue: "",
		highlightedValue: ""
	};

	componentWillMount() {
		this.setState({
			items: this.props.items.map(item => ((typeof item === "string") ? {name: item, value: item} : item))
		});
	}

	componentDidMount() {
		let {value} = this.props;
		let item = this.getItemByValue(value);
		if (item) {
			let {name, value} = item;
			this.setState({
				textValue: name,
				highlightedValue: value
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		this.setState({
			items: nextProps.items.map(item => ((typeof item === "string") ? {name: item, value: item} : item))
		});
	}

	componentDidUpdate(prevProps, prevState) {
		super.componentDidUpdate(prevProps, prevState);
		let {value} = this.state;
		if (prevState.value !== value) {
			this.setState({
				highlightedValue: value
			});
		}
	}

	getDropDownItems() {
		let {items, textValue, filterValues} = this.state;
		if (filterValues) {
			return items.filter(({name}) => (textValue ? name.toLowerCase().includes(textValue.trim().toLowerCase()) : true));
		}
		return items;
	}

	getItemByValue(itemValue, noFilter = false) {
		if (noFilter) {
			let {items} = this.state;
			return items.filter(({value}) => (value === itemValue))[0];
		} else {
			return this.getDropDownItems().filter(({value}) => (value === itemValue))[0];
		}
	}

	getIndexOfHighlighted() {
		let {highlightedValue} = this.state;
		let items = this.getDropDownItems();
		let item = this.getItemByValue(highlightedValue);
		return items.indexOf(item);
	}

	onChange(evt) {
		this.setState({
			textValue: evt.target.value
		});
	}

	onKeyDown(evt) {
		let {showDropDown, filterValues, value, highlightedValue} = this.state;
		let items = this.getDropDownItems();
		let hIndex = this.getIndexOfHighlighted();
		if (evt.key === "Enter") {
			let item = this.getItemByValue(value, true);
			let hItem = this.getItemByValue(highlightedValue);
			if (item && hItem) {
				this.setState({
					value: showDropDown ? hItem.value : item.value,
					textValue: showDropDown ? hItem.name : item.name,
				});
				if (showDropDown) {
					this.hideDropDown();
				} else {
					this.showDropDown();
				}
			}
		} else if (evt.key === "ArrowUp") {
			hIndex = hIndex ? hIndex - 1 : items.length - 1;
			this.setState({
				highlightedValue: items[hIndex]["value"]
			});
			this.showDropDown(filterValues);
		} else if (evt.key === "ArrowDown") {
			hIndex = (hIndex + 1) % (items.length);
			this.setState({
				highlightedValue: items[hIndex]["value"]
			});
			this.showDropDown(filterValues);
		} else if (evt.key === "Escape") {
			this.onBlur();
		} else {
			this.showDropDown(true);
		}
	}

	showDropDown(filterValues = false) {
		let {showDropDown} = this.state;
		if (!showDropDown) {
			this.dropDownInputElem.focus();
			this.showDropDownJustTriggered = true;
		}
		if (this._hideTimer) {
			clearTimeout(this._hideTimer);
			delete this._hideTimer;
		}
		this.setState({
			showDropDown: true,
			filterValues
		});
	}

	hideDropDown(state, filterValues = false) {
		state = state || {};
		if (this._hideTimer) {
			clearTimeout(this._hideTimer);
			delete this._hideTimer;
		}
		this._hideTimer = setTimeout(() => {
			this.setState({
				...state,
				showDropDown: false,
				filterValues
			});
		}, 250);
	}

	onArrowClick(e) {
		e.preventDefault();
		e.stopPropagation();
		let {showDropDown} = this.state;
		if (showDropDown) {
			this.hideDropDown();
		} else {
			this.showDropDown();
		}
	}

	onBlur() {
		let {value} = this.state;
		let item = this.getItemByValue(value);
		if (item) {
			let {name, value} = item;
			this.hideDropDown({
				textValue: name,
				highlightedValue: value
			});
		}
	}

	onSelect(value) {
		let item = this.getItemByValue(value);
		if (item) {
			let {name, value} = item;
			this.setState({
				value,
				textValue: name,
				highlightedValue: value
			});
			this.hideDropDown();
		}
	}

	scrollElementIntoView(viewElement, elementToScroll, toTop) {
		let scrollPadding = 2;
		if (viewElement) {
			if (elementToScroll) {
				let elementToScrollRelTop = elementToScroll.offsetTop - viewElement.scrollTop;
				let viewBottomBoundary = viewElement.getBoundingClientRect().height - elementToScroll.getBoundingClientRect().height;
				if (toTop) {
					if (elementToScrollRelTop < scrollPadding || elementToScrollRelTop > (viewBottomBoundary - scrollPadding)) {
						viewElement.scrollTop = elementToScroll.offsetTop - scrollPadding;
					}
				} else {
					if (elementToScrollRelTop < scrollPadding) {
						viewElement.scrollTop = elementToScroll.offsetTop - scrollPadding;
					}
					if (elementToScrollRelTop > (viewBottomBoundary - scrollPadding)) {
						viewElement.scrollTop = elementToScroll.offsetTop - (viewBottomBoundary - scrollPadding);
					}
				}
			}
		}
	}

	renderItemsList() {
		let {showDropDown, highlightedValue, value} = this.state;
		let items = this.getDropDownItems();
		if (showDropDown) {
			setTimeout(() => {
				if (this.itemsListElem) {
					if (this.showDropDownJustTriggered) {
						this.showDropDownJustTriggered = false;
						this.selectedItemElem && this.scrollElementIntoView(this.itemsListElem, this.selectedItemElem, true);
					} else {
						this.highlightedItemElem && this.scrollElementIntoView(this.itemsListElem, this.highlightedItemElem);
					}
				}
				delete this.selectedItemElem;
				delete this.highlightedItemElem;
			}, 0);
			return (
				<div className="items-list-wrapper">
					<ul
						className="items-list"
						ref={(list) => {
							this.itemsListElem = list;
						}}
					>
						{
							items.map((item, i) => {
								let classNames = [];
								if (item["value"] === highlightedValue) {
									classNames.push("highlighted");
								}
								if (item["value"] === value) {
									classNames.push("selected");
								}
								return (
									<li
										key={i}
										onClick={this.onSelect.bind(this, item["value"])}
										className={classNames.join(" ")}
										ref={(itemElem) => {
											if (item["value"] === highlightedValue) {
												this.highlightedItemElem = itemElem;
											}
											if (item["value"] === value) {
												this.selectedItemElem = itemElem;
											}
										}}
									>
										{item["name"]}
									</li>
								)
							})
						}
					</ul>
					<span className="arrow-head"/>
				</div>
			);
		}
	}

	render() {
		let {items, onValueChange, label, ...others} = this.props;
		let {textValue} = this.state;
		return (
			<div className="drop-down-box">
				{
					this.renderLabelledInput(
						<span className={this.getClassNames().join(" ")}>
							<input
								{...others}
								ref={(input) => {
									this.dropDownInputElem = input;
								}}
								value={textValue}
								onChange={::this.onChange}
								onKeyDown={::this.onKeyDown}
								onBlur={::this.onBlur}
								onClick={::this.onArrowClick}
							/>
							<span className="position-arrow" onClick={::this.onArrowClick}>
								<span className="arrow-down"/>
							</span>
						</span>
					)
				}
				{this.renderItemsList()}
			</div>
		)
	}
}

export class NeonDropDownBox extends DropDownBox {
	isNeon() {
		return true;
	}
}
