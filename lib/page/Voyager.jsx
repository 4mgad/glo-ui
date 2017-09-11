import React, {Component} from 'react';
import PropTypes from 'prop-types';

import LargeButton from '../buttons/LargeButton';
import TripProgressBar from '../links/TripProgressBar';
import VoyageStation from './VoyageStation';

import './Voyager.scss';

export default class Voyager extends Component {
	static propTypes = {
		currentStation: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		visitedStations: PropTypes.array,
		hideNextButton: PropTypes.bool,
		hideBackButton: PropTypes.bool,
		onStationChange: PropTypes.func
	};

	static defaultProps = {
		currentStation: 0,
		visitedStations: [],
		hideNextButton: false,
		hideBackButton: false,
		onStationChange: () => {}
	};

	state = {
		...this.props
	};

	componentWillMount() {
		this.gotoCurrentStation(this.props);
	}

	componentWillReceiveProps(nextProps) {
		let {currentStation} = this.props;
		if (nextProps.currentStation !== currentStation) {
			this.gotoCurrentStation(nextProps);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		let {currentStation} = this.state;
		if (prevState.currentStation !== currentStation) {
			let voyageStations = this.getVoyageStations();
			let {value} = voyageStations[currentStation].props;
			this.props.onStationChange(value, currentStation);
		}
	}

	gotoCurrentStation(props) {
		let {currentStation} = props;
		this.gotoStationByIndex(this.getStationIndex(currentStation));
	}

	getVoyageStations(children) {
		children = children || this.props.children;
		let stations = [];
		children.map(child => {
			let {type, props} = child;
			if (type === VoyageStation) {
				stations.push(child);
			} else {
				if (props && props.children) {
					stations.push(...this.getVoyageStations(props.children));
				}
			}
		});
		return stations;
	}

	getProgressItems() {
		let voyageStations = this.getVoyageStations();
		let items = [];
		voyageStations.map(child => {
			let {name, value} = child.props;
			value = value || name;
			if (name) {
				items.push({name, value});
			}
		});
		return items;
	}

	atStation() {
		let voyageStations = this.getVoyageStations();
		let {currentStation} = this.state;
		return currentStation > -1 && currentStation < voyageStations.length;
	}

	atFirstStation() {
		let {currentStation} = this.state;
		return currentStation === 0;
	}

	atLastStation() {
		let voyageStations = this.getVoyageStations();
		let {currentStation} = this.state;
		return currentStation === (voyageStations.length - 1);
	}

	gotoStationByIndex(stationIndex, noHistory) {
		let {currentStation} = this.state;
		let currentStationIndex = this.getStationIndex(currentStation);
		if (stationIndex > -1) {
			let voyageStations = this.getVoyageStations();
			let {visitedStations} = this.state;
			let {name, value} = voyageStations[stationIndex].props;
			value = value || name;
			if (value) {
				if (!~visitedStations.indexOf(value)) {
					visitedStations.push(value);
				}
			}
			if (currentStationIndex !== stationIndex && !noHistory) {
				this.stationHistory = this.stationHistory || [];
				this.stationHistory.push(currentStation);
			}
			this.setState({
				currentStation: stationIndex,
				visitedStations
			});
		}
	}

	getStationIndex(stationValue) {
		let stationIndex = -1;
		if (typeof stationValue === "string") {
			let voyageStations = this.getVoyageStations();
			voyageStations.map((child, idx) => {
				let {name, value} = child.props;
				value = value || name;
				if (value && value === stationValue) {
					stationIndex = idx;
				}
			});
		} else if (typeof stationValue === "number") {
			stationIndex = stationValue;
		}
		return stationIndex;
	}

	gotoStationByValue(stationValue) {
		this.gotoStationByIndex(this.getStationIndex(stationValue));
	}

	prevStation() {
		let {currentStation} = this.state;
		if (this.atStation() && !this.atFirstStation()) {
			this.stationHistory = this.stationHistory || [];
			let stationIndex = this.stationHistory.pop();
			if (stationIndex !== undefined) {
				this.gotoStationByIndex(stationIndex, true);
			} else {
				this.gotoStationByIndex(--currentStation, true);
			}
		}
	}

	nextStation() {
		let {currentStation} = this.state;
		if (this.atStation() && !this.atLastStation()) {
			this.gotoStationByIndex(++currentStation);
		}
	}

	getBackButton() {
		let {hideBackButton} = this.props;
		if (!hideBackButton) {
			return (
				<LargeButton
					title="Back"
					disabled={this.atFirstStation()}
					onClick={::this.prevStation}
				/>
			);
		}
	}

	getNextButton() {
		let {hideNextButton} = this.props;
		if (!hideNextButton) {
			return (
				<LargeButton
					title="Next"
					primary={false}
					disabled={this.atLastStation()}
					onClick={::this.nextStation}
				/>
			);
		}
	}

	render() {
		let voyageStations = this.getVoyageStations();
		let {currentStation, visitedStations} = this.state;
		let currentStationComp = voyageStations[currentStation] || "";
		return (
			<div className="voyager">
				<TripProgressBar
					items={this.getProgressItems()}
					values={visitedStations}
					onClick={::this.gotoStationByValue}
				/>
				{currentStationComp}
				<div className="buttons-bar">
					{this.getBackButton()}
					{this.getNextButton()}
				</div>
			</div>
		);
	}
}
