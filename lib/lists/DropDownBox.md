```jsx
//import {DropDownBox, NeonDropDownBox} from 'glo-ui';
let {DropDownBox, NeonDropDownBox} = require('.');

<div>
	<DropDownBox
		items={[
			{name: 'Matthew', value: 'Mat'},
			{name: 'Mark', value: 'Mrk'},
			{name: 'Luke', value: 'Lke'},
			{name: 'John', value: 'Jon'},
			{name: 'Carol', value: 'Crl'},
			{name: 'Tom', value: 'Tom'}
		]}
		value='Mrk'
		onValueChange={(value) => {console.log(value)}}
	/>
	<NeonDropDownBox
		items={[
			{name: 'Matthew', value: 1},
			{name: 'Mark', value: 2},
			{name: 'Luke', value: 3},
			{name: 'John', value: 4},
			{name: 'Carol', value: 5},
			{name: 'Tom', value: 6}
		]}
		value={2}
		onValueChange={(value) => {console.log(value)}}
	/>
	<DropDownBox
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<NeonDropDownBox
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<br />
	<NeonDropDownBox
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<DropDownBox
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<DropDownBox
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<NeonDropDownBox
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<br />
	<br />
	<DropDownBox
		label="Name"
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<NeonDropDownBox
		label="Name"
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<DropDownBox
		label="Name"
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<NeonDropDownBox
		label="Name"
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<br />
	<NeonDropDownBox
		label="Name"
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<DropDownBox
		label="Name"
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<DropDownBox
		label="Name"
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
	<NeonDropDownBox
		label="Name"
		items={['Matthew', 'Mark', 'Luke', 'John', 'Carol', 'Tom']}
		value='Mark'
		onValueChange={(value) => {console.log(value)}}
	/>
</div>
```
