```jsx
const getManyItems = () => {
	let items = [];
	for (let i = 1; i < 100; i++) {
		items.push({
			name: "Item " + i,
			value: "item" + i
		});
	}
	return items;
};

<div style={{display: "flex"}}>
	<div style={{width: "200px", marginRight: "10px"}}>
		<SelectBox name="Box 1" value="box1" items={getManyItems()} onChange={(selectedItems) => {
			console.log(selectedItems);
		}}/>
	</div>
	<div style={{width: "200px", marginRight: "10px"}}>
		<SelectBox 
			name="Box 2" 
			value="box2" 
			items={[
				{
					name: "test1", value: "val1"
				}, {
					name: "test2", value: "val2"
				}
			]} 
			onChange={(selectedItems) => {
				console.log(selectedItems);
			}}
		/>
	</div>
	<div style={{width: "200px", marginRight: "10px"}}>
		<SelectBox 
			name="Box 3" 
			value="box3" 
			items={[
				{
					name: "test1", value: "val1"
				}, {
					name: "test2", value: "val2", selected: true
				}
			]} 
			onChange={(selectedItems) => {
				console.log(selectedItems);
			}}
		/>
	</div>
	<div style={{width: "200px", marginRight: "10px"}}>
		<SelectBox 
			name="Box 4" 
			value="box4" 
			items={[
				{
					name: "test1", value: "val1", selected: true
				}, {
					name: "test2", value: "val2", selected: true
				}
			]} 
			onChange={(selectedItems) => {
				console.log(selectedItems);
			}}
		/>
	</div>
</div>
```
