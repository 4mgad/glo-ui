Example:

```jsx static
import {AbstractValueObserver} from 'glo-ui';
export default class MyInput extends AbstractValueObserver {
  static propTypes = {
    ...AbstractValueObserver.propTypes,
    ...
  };

  static defaultProps = {
    ...AbstractValueObserver.defaultProps,
    ...
  };
  
  render() {
    ...
  }
}
```
