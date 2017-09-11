import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Provides abstract functionality that most value observer inputs need.
 * It triggers **onValueChange** event only when the state value actually changes.
 */
export default class AbstractValueObserver extends Component {
	static propTypes = {
		/** Gets triggered when the state value actually changes */
		onValueChange: PropTypes.func
	};

	static defaultProps = {
		onValueChange: () => {}
	};

	state = {
		value: this.props.value
	};

	componentWillReceiveProps(nextProps) {
		let {value} = this.state;
		if (nextProps.value !== value) {
			this.setState({
				value: nextProps.value
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		let {onValueChange} = this.props;
		let {value} = this.state;
		if (prevState.value !== value) {
			onValueChange(value);
		}
	}

	render() {}
}
