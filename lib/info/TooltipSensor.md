```jsx
	class MyApp extends AbstractApp {
		renderApp(){
			return (
				<div>
					<div>
						<span style={{padding:5}}>
							<TooltipSensor content="test 1">Mouse over here to see the tooltip 1</TooltipSensor>
						</span>
						<span style={{padding:5}}>
							<TooltipSensor content="test 2">Mouse over here to see the tooltip 2</TooltipSensor>
						</span>
					</div>
					<div>
						<span style={{padding:5}}>
							<TooltipSensor
								content={(
									<div>
										<div><label>Label 1:</label> <span>value 1</span></div>
										<div><label>Label 2:</label> <span>value 2</span></div>
										<div><label>Label 3:</label> <span>value 3sss</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3dddd</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
										<div><label>Label 3:</label> <span>value 3</span></div>
									</div>
								)}
							>
								Mouse over here to see the tooltip 3
							</TooltipSensor>
						</span>
					</div>
				</div>
			);
		}
	}
	
	<MyApp />
```
