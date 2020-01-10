#!/bin/bash

FNAME=$1

if [ "$FNAME" == "" ]
then
    echo "Missing function name"
    exit 0
fi

zip -r build/$FNAME.zip funcs/$FNAME/
aws lambda update-function-code --function-name $FNAME --zip-file fileb://build/$FNAME.zip