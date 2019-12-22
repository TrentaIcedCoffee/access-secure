#!/bin/sh

FNAME=${PWD##*/}

zip -r --exclude=*build/* build/function.zip .
aws lambda update-function-code --function-name $FNAME --zip-file fileb://build/function.zip