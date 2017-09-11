#!/usr/bin/env bash

sed -Ei.bak 's/"(.+)": "\^.+"/"\1": "*"/g' ../package.json
