#!/bin/bash

cd ./index
zip -r index.zip .
aws lambda update-function-code --function-name index --zip-file fileb://index.zip
rm -f ./index.zip