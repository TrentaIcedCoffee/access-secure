#!/bin/sh

FNAME=${PWD##*/}

zip -r build/function.zip . -x build/\* -x debug.js -x package.json -x package-lock.json
aws lambda update-function-code --function-name $FNAME --zip-file fileb://build/function.zip