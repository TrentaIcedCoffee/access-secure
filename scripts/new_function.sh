#!/bin/sh

FNAME=${1}

mkdir -p "$FNAME"/build "$FNAME"/resources
cp /home/ubuntu/environment/logsecure/scripts/assets/index.js "$FNAME"
cp /home/ubuntu/environment/logsecure/scripts/assets/debug.js "$FNAME"