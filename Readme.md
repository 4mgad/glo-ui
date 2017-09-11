---

Glo UI is a user interface library built on top of [React JavaScript library](https://facebook.github.io/react/). It's opinionated regarding styles and initial application structure. However, styles and components can be easily overridden. Its styles and UI components can be used as-is to help quickly put together a responsive web application that works on desktop browsers as well as mobile browsers.

**Installation:**
```jsx static
npm install --save glo-ui
```

**Importing components**

All Glo-ui components can be imported directly from glo-ui dependency. For example, to import **LargeButton** component from **glo-ui** you would use the following statement:
```jsx static
import {LargeButton} from 'glo-ui';
```

**Glo-ui application**

Glo-ui provides a boiler-plate application entry point that provides some global level features, like showing/hiding global messages centered in the middle of the screen, showing tooltips upon hovering over certain elements ...etc. In order to leverage those features you just need to extend AbstractApp component and override its renderApp function as follows:

Example:
```jsx static
import g, {AbstractApp, SmallButton} from 'glo-ui';

export default class MyApp extends AbstractApp {
  renderApp() {
    return (
      <div>
        <h1>Glo UI Hello World App!</h1>
        <div>
          <SmallButton 
            title="Show Message" 
            onClick={
              () => {
                g.showMessage({title: "Message Title", content: "Message Content"})
              }
            }
          />
          <SmallButton 
            title="Show Dialog" 
            onClick={
              () => {
                g.showDialog({title: "Dialog Title", content: "Dialog Content"})
              }
            }
          />
        </div>
      </div>
    );
  }
}

```
Running Example:
```jsx noeditor
let {g} = require('./globals');

class MyApp extends AbstractApp {
  renderApp(){
    return (
      <div style={{border: "1px solid", padding: "10px"}}>
        <h1>Glo UI Hello World App!</h1>
        <div>
          <SmallButton 
            title="Show Message" 
            onClick={
              () => {
                g.showMessage({title: "Message Title", content: "Message Content"})
              }
            }
          />
          <SmallButton 
            title="Show Dialog" 
            onClick={
              () => {
                g.showDialog({title: "Dialog Title", content: "Dialog Content"})
              }
            }
          />
        </div>
      </div>
    );
  }
}

<MyApp />
```
