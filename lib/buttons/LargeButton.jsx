import React from 'react';

import AbstractButton from '../abstracts/AbstractButton';

import './LargeButton.scss';

/**
 * General component description.
 */
export default class LargeButton extends AbstractButton {

	getClassNames() {
		let classNames = super.getClassNames();
		classNames.push("large-button");
		return classNames;
	}

	render() {return super.render();}

}
