Voyager component looks for VoyageStation sub-element components to list them as a navigable section. It has back/next buttons on the bottom to allow the user to navigate back and forth through the different sections of this Voyager component. It also shows which sections (station) has been previously visited by highlighting its bread crumb.
```jsx
<Voyager>
	<VoyageStation name="Station 1" value="s1">
		<h1>Station 1</h1>
	</VoyageStation>
	<VoyageStation name="Station 2" value="s2">
		<h1>Station 2</h1>
	</VoyageStation>
	<VoyageStation>
		<h1>Hidden Station but still navigable</h1>
	</VoyageStation>
	<VoyageStation name="Station 3" value="s3">
		<h1>Station 3</h1>
	</VoyageStation>
	<VoyageStation name="Station 4" value="s4">
		<h1>Station 4</h1>
	</VoyageStation>
	<VoyageStation name="Station 5" value="s5">
		<h1>Station 5</h1>
	</VoyageStation>
	<VoyageStation name="Station 6" value="s6">
		<h1>Station 6</h1>
	</VoyageStation>
</Voyager>
```
