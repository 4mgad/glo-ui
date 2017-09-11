import React from 'react';

import AbstractButton from '../abstracts/AbstractButton';

import './SmallButton.scss';

export default class SmallButton extends AbstractButton {

	getClassNames() {
		let classNames = super.getClassNames();
		classNames.push("small-button");
		return classNames;
	}

	render() {return super.render();}
}
