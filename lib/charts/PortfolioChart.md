This component is not responsive yet (please let me know if you'd like to contribute to this project - aj@amgad.us)

```jsx
const {historical, projected} = require('./PortfolioChartData.json');
<PortfolioChart
	historical={historical}
	projected={projected}
	principal={1000}
	initialPrincipal={1000}
	investmentFrequency="Monthly"
	investmentAmount={100.00}
	dateField="_DATE"
	rebalancedField="_REBALANCED"
	timeFrame={12}
	startDate="2012-01-01"
	endDate="2022-01-01"
	showLegend={true}
	showHoverLegend={true}
	showTopMouseCoordinate={false}
	showLeftMouseCoordinate={false}
	showRightIndicatorsFor={["S&P", "Portfolio", "High", "Low"]}
	colorScheme="dark2"
/>
```
