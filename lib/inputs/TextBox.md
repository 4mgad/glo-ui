Text Boxes
```jsx
//import {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} from 'glo-ui';
let {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} = require('.');

<div>
	<TextBox placeholder="Text Box"/>
	<br />
	<NeonTextBox placeholder="Neon Text Box"/>
	<br />
	<PercentBox value={100}/>
	<br />
	<NeonPercentBox value={100}/>
	<br />
	<MoneyBox value={100}/>
	<br />
	<NeonMoneyBox value={100}/>
</div>
```

Read Only Text Boxes
```jsx
//import {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} from 'glo-ui';
let {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} = require('.');

<div>
	<TextBox value="Read Only Text Box" readOnly={true}/>
	<br />
	<NeonTextBox value="Read Only Neon Text Box" readOnly={true}/>
	<br />
	<PercentBox value={100} readOnly={true}/>
	<br />
	<NeonPercentBox value={100} readOnly={true}/>
	<br />
	<MoneyBox value={100} readOnly={true}/>
	<br />
	<NeonMoneyBox value={100} readOnly={true}/>
</div>
```

Patterned Text Boxes
```jsx
//import {TextBox} from 'glo-ui';
let {TextBox} = require('.');

<div>
	<TextBox
		placeholder="Text Box"
		pattern="[0-9a-zA-Z ]+"
		required
		invalidValueMessage="Field is required"
		value="Alphanumeric required field"
		size="30"
		onValueChange={(val) => {console.log(val)}}
	/>
</div>
```

Text Boxes - Side By Side
```jsx
//import {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} from 'glo-ui';
let {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} = require('.');

<div>
	<TextBox placeholder="Text Box"/>
	<TextBox placeholder="Text Box"/>
	<br />
	<NeonTextBox placeholder="Neon Text Box"/>
	<NeonTextBox placeholder="Neon Text Box"/>
	<br />
	<PercentBox value={100} size="7"/>
	<PercentBox value={100}/>
	<br />
	<NeonPercentBox value={100} size="7"/>
	<NeonPercentBox value={100}/>
	<br />
	<MoneyBox value={100} size="7"/>
	<MoneyBox value={100}/>
	<br />
	<NeonMoneyBox value={100} size="7"/>
	<NeonMoneyBox value={100}/>
</div>
```

Text Boxes - Large Fonts
```jsx
//import {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} from 'glo-ui';
let {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} = require('.');

<div>
	<TextBox placeholder="Large Font Text Box" style={{fontSize: '30px'}}/>
	<br/>
	<NeonTextBox placeholder="Neon Text Box" style={{fontSize: '30px'}}/>
	<br />
	<PercentBox value={100} style={{fontSize: '30px'}}/>
	<br/>
	<NeonPercentBox value={100} style={{fontSize: '30px'}}/>
	<br/>
	<MoneyBox value={100} style={{fontSize: '30px'}}/>
	<br/>
	<NeonMoneyBox value={100} style={{fontSize: '30px'}}/>	
</div>
```

Labelled Text Boxes
```jsx
//import {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} from 'glo-ui';
let {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} = require('.');

<div>
	<TextBox placeholder="Text Box" label="Label"/>
	<br />
	<NeonTextBox placeholder="Neon Text Box" label="Label"/>
	<br />
	<PercentBox value={100} label="Label"/>
	<br />
	<NeonPercentBox value={100} label="Label"/>
	<br />
	<MoneyBox value={100} label="Label"/>
	<br />
	<NeonMoneyBox value={100} label="Label"/>
</div>
```

Labelled Text Boxes - Side By Side
```jsx
//import {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} from 'glo-ui';
let {TextBox, NeonTextBox, PercentBox, NeonPercentBox, MoneyBox, NeonMoneyBox} = require('.');

<div>
	<TextBox placeholder="Text Box" label="Label Label Label Label Label Label Label Label"/>
	<TextBox placeholder="Text Box" label="Label"/>
	<br />
	<NeonTextBox placeholder="Neon Text Box" label="Label Label Label Label Label Label Label Label"/>
	<NeonTextBox placeholder="Neon Text Box" label="Label"/>
	<br />
	<PercentBox value={100} label="Label"/>
	<PercentBox value={100} label="Label"/>
	<br />
	<NeonPercentBox value={100} label="Label"/>
	<NeonPercentBox value={100} label="Label"/>
	<br />
	<MoneyBox value={100} label="Label"/>
	<MoneyBox value={100} label="Label"/>
	<br />
	<NeonMoneyBox value={100} label="Label"/>
	<NeonMoneyBox value={100} label="Label"/>
</div>
```
