```jsx
<div style={{width: "100%", height: 50, marginTop: 20, marginBottom: 20}}>
	<RangeSlider min={0} max={500} value={333} onValueChange={(value) => {console.log(value)}}/>
</div>
```

```jsx
<div style={{width: 50, height: 150, marginTop: 20, marginBottom: 20}}>
	<RangeSlider min={0} max={500} value={444} vertical={true} minColor="#f3a235" maxColor="#fc0d1b" onValueChange={(value) => {console.log(value)}}/>
</div>
```
