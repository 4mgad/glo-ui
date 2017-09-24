Example:

```jsx
class CustomButton extends AbstractButton {
  getClassNames() {
    let classNames = super.getClassNames();
    classNames.push("custom-button");
    return classNames;
  }
  render() {return super.render();}
}

<CustomButton title="My Button"/>
```
