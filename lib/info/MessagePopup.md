```jsx
	//import g from '../../globals';
	let {g} = require('../../globals');
	
	class MyApp extends AbstractApp {
		renderApp(){
			return (
				<div>
					<SmallButton title="Show Message" onClick={() => {g.showMessage({title: "Message Title", content: "Message Content"})}}/>
					<SmallButton title="Show Dialog" onClick={() => {g.showDialog({title: "Dialog Title", content: "Dialog Content"})}}/>
				</div>
			);
		}
	}
	
	<MyApp />
```
