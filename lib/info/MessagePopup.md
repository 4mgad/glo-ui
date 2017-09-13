```jsx
let {g} = require('../../globals');

class MyApp extends AbstractApp {
	renderApp(){
		return (
			<div>
				<SmallButton 
					title="Show Message" 
					onClick={
						() => {
							g.showMessage({title: "Hi There!", content: "Hello World!"})
						}
					}
				/>
				<SmallButton 
					title="Show Dialog" 
					onClick={
						() => {
							g.showDialog({title: "Hi There!", content: (<h3>Hello World!</h3>)})
						}
					}
				/>
			</div>
		);
	}
}

<MyApp />
```
