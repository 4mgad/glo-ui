Example:

```jsx static
import {AbstractButton} from 'glo-ui';
export default class CustomButton extends AbstractButton {
  getClassNames() {
    let classNames = super.getClassNames();
    classNames.push("custom-button");
    return classNames;
  }
  render() {return super.render();}
}
```
