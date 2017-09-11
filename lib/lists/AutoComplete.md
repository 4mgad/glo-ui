```jsx
const itemsArr = [
	{
		"name": "Agilent Technologies Inc.",
		"value": "A"
	},
	{
		"name": "Alcoa, Inc.",
		"value": "AA"
	},
	{
		"name": "Atlantic American Corp.",
		"value": "AAME"
	},
	{
		"name": "Aaron's, Inc.",
		"value": "AAN"
	},
	{
		"name": "AAON Inc.",
		"value": "AAON"
	},
	{
		"name": "Advance Auto Parts Inc.",
		"value": "AAP"
	},
	{
		"name": "Apple Inc.",
		"value": "AAPL"
	},
	{
		"name": "American Assets Trust, Inc.",
		"value": "AAT"
	}
];

<AutoComplete
	items={itemsArr}
	onChange={(value) => {console.log(value)}}
	onItemSelect={(item) => {console.log(item)}}
	hideOnSelect={true}
/>
```
