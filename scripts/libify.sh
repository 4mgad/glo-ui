#!/usr/bin/env bash

node ./scripts/libify.js ./globals ./lib

echo "import './styles.scss';" > index.jsx.tmp
echo "import {g} from './globals';" >> index.jsx.tmp
cat index.jsx >> index.jsx.tmp
echo "export default g;" >> index.jsx.tmp
cat index.jsx.tmp > index.jsx
rm index.jsx.tmp
