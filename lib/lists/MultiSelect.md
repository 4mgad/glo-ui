Deletable Items
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

<MultiSelect
	items={itemsArr}
	min={2}
	onItemDelete={(item) => {console.log(item)}}
	onDeleteAllItems={(items) => {console.log(items)}}
/>
```

Selectable Items
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

<MultiSelect
	selectable={true}
	items={itemsArr}
	min={2}
/>
```
