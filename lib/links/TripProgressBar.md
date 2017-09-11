```jsx
const stationsArr = [
	{name: "California", value: "ca"},
	{name: "New York", value: "ny"},
	{name: "Texas", value: "tx"},
	{name: "Washington", value: "wa"},
	{name: "Florida", value: "fl"}
];

initialState = {
	visitedStations: ["ca", "ny"]
};

<div>
	<TripProgressBar
		items={stationsArr}
		values={state.visitedStations}
		onClick={(value, idx) => {
			console.log(stationsArr[idx].name + " clicked");
			if(state.visitedStations.indexOf(value) < 0){
				state.visitedStations.push(value);
			}
			setState({visitedStations: state.visitedStations});
		}}
	/>
</div>

```
