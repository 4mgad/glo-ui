import React, {Component} from 'react';

import g from '../../globals/g';

import TooltipPopup from '../info/TooltipPopup';
import MessagePopup from '../info/MessagePopup';

/**
 * Provides abstract functionality that most applications need,
 * like show/hide a message, or show/hide a tooltip that is rendered
 * as a singleton to avoid overloading the dom space.
 * It should be extended to implement **renderApp** function to render the
 * main application.
 */
export default class AbstractApp extends Component {
	state = {
		showTooltip: false,
		showTooltipDelay: 500,
		hideTooltipDelay: 1000,
		tooltipContent: null,
		tooltipPosition: {
			top: -1000,
			left: -1000
		},
		showMessage: false,
		messageStyle: "",
		messageTitle: "",
		messageContent: null,
		messageButtons: null
	};

	constructor(props) {
		super(props);
		g.setApp(this);
	}

	cancelHideTimer(evt) {
		if (evt) {
			evt.preventDefault();
			evt.stopPropagation();
		}
		if (this._hideTTTimer) {
			clearTimeout(this._hideTTTimer);
			delete this._hideTTTimer;
		}
	}

	cancelShowTimer(evt) {
		if (evt) {
			evt.preventDefault();
			evt.stopPropagation();
		}
		if (this._showTTTimer) {
			clearTimeout(this._showTTTimer);
			delete this._showTTTimer;
		}
	}

	/**
	 * Show global tooltip at a specific position.
	 *
	 * @param {Object} config
	 * @public
	 */
	showTooltip(config) {
		let {content, position, showDelay, hideDelay} = config;
		this.cancelHideTimer();
		this.cancelShowTimer();
		this._showTTTimer = setTimeout(() => {
			this.setState({
				showTooltip: true,
				showTooltipDelay: showDelay,
				hideTooltipDelay: hideDelay,
				tooltipContent: content
			});
			let globalTooltip = document.getElementById("globalTooltip");
			if (globalTooltip) {
				let tooltipBox = globalTooltip.getBoundingClientRect();
				let tooltipPosition = {
					top: position.top - tooltipBox.height - 7,
					left: position.left
				};
				this.setState({
					tooltipPosition
				});
			}
			delete this._showTTTimer;
		}, showDelay);
	}

	/**
	 * Hide global tooltip.
	 *
	 * @public
	 */
	hideTooltip(evt) {
		if (evt) {
			evt.preventDefault();
			evt.stopPropagation();
		}
		this.cancelShowTimer();
		let {showTooltip, hideTooltipDelay} = this.state;
		if (showTooltip && !this._hideTTTimer) {
			this._hideTTTimer = setTimeout(() => {
				this.setState({
					showTooltip: false,
					tooltipContent: null,
					tooltipPosition: {
						top: -1000,
						left: -1000
					},
					showTooltipDelay: 500,
					hideTooltipDelay: 1000
				});
				delete this._hideTTTimer;
			}, hideTooltipDelay);
		}
	}

	/**
	 * Show global message in the center of the page.
	 *
	 * @param {string} messageTitle
	 * @param {Component} messageContent
	 * @param {Array} messageButtons
	 * @param {string} messageStyle
	 * @public
	 */
	showMessage(messageTitle, messageContent, messageButtons, messageStyle) {
		this.setState({
			showMessage: true,
			messageStyle,
			messageTitle,
			messageContent,
			messageButtons
		});
	}

	/**
	 * Hide global message.
	 *
	 * @public
	 */
	hideMessage() {
		this.setState({
			showMessage: false,
			messageStyle: "",
			messageTitle: "",
			messageContent: null,
			messageButtons: null
		});
	}

	renderApp() {
		//abstract function
		return null;
	}

	render() {
		let {
			showTooltip,
			tooltipContent,
			tooltipPosition,
			showMessage,
			messageStyle,
			messageTitle,
			messageContent,
			messageButtons
		} = this.state;
		return (
			<div className="app" onMouseOver={::this.hideTooltip}>
				{this.renderApp()}
				<TooltipPopup
					id="globalTooltip"
					show={showTooltip}
					position={tooltipPosition}
					onMouseOver={::this.cancelHideTimer}
				>
					{tooltipContent}
				</TooltipPopup>
				<MessagePopup
					className={messageStyle}
					title={messageTitle}
					buttons={messageButtons}
					show={showMessage}
				>
					{messageContent}
				</MessagePopup>
			</div>
		);
	}

}
