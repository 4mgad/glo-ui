Example:

```jsx static
import {AbstractLabelledInput} from 'glo-ui';
export default class LabelledInput extends AbstractLabelledInput {
  return (
    <div className="text-box">
      {
        this.renderLabelledInput(
          <span className={this.getClassNames().join(" ")}>
            <input ... />
          </span>
        )
      }
    </div>
  );
}
```
