#!/bin/bash

FNAME=$1

if [ "$FNAME" == "" ]
then
    echo "Missing function name"
    exit 0
fi

cd funcs/$FNAME/
zip -r ../../build/$FNAME.zip .
cd ../../
aws lambda update-function-code --function-name $FNAME --zip-file fileb://build/$FNAME.zip
rm -f build/$FNAME.zip # generate new zip everytime