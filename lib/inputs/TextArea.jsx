import React, {Component} from 'react';

import './TextArea.scss';

export default class TextArea extends Component {

	render() {
		let classNames = ["input", "text-area", "gradient-border"];
		return (
			<span className={classNames.join(" ")}>
				<textarea {...this.props} />
			</span>
		);
	}
}
