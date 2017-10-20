import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SmallButton from '../buttons/SmallButton';
import g from '../../globals/g';

import './MessagePopup.scss';

const defaultButtons = [<SmallButton key={0} title="OK" onClick={g.hideMessage}/>];

export default class MessagePopup extends Component {

	static propTypes = {
		className: PropTypes.string,
		title: PropTypes.string,
		buttons: PropTypes.array,
		show: PropTypes.bool
	};

	static defaultProps = {
		className: "",
		title: "",
		show: false
	};

	state = {
		shown: false
	};

	componentDidMount() {
		let {show} = this.props;
		this.setState({shown: show});
	}

	componentWillReceiveProps(nextProps) {
		let {show} = nextProps;
		let {shown} = this.state;
		if (show !== shown) {
			this.setState({shown: show});
		}
	}

	hide() {
		this.setState({shown: false});
	}

	render() {
		let {className, title, buttons, children} = this.props;
		let {shown} = this.state;

		let classNames = ["message-popup"];
		if (className) {
			classNames.push(...className.split(" "));
		}

		if (shown) {
			return (
				<div className={classNames.join(" ")}>
					<div className="overlay" onClick={::this.hide}></div>
					<div className="popup-box popup">
						<div className="title">{title || ""}</div>
						<div className="content">{children || ""}</div>
						<div className="buttons">{buttons || defaultButtons}</div>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}

}
