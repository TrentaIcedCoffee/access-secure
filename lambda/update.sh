#!/bin/bash

UTILSPATH="./utils"
UTILS="utils.js"
PACKAGE="package.json"
RESOURCES="resources"

for D in funcs/*; do
  if [ -d "${D}" ]; then
    rm "${D}/${UTILS}" && cp "${UTILSPATH}/${UTILS}" ${D}
    echo "covered ${UTILSPATH}/${UTILS} to ${D}/${UTILS}"
    rm "${D}/${PACKAGE}" && cp "${UTILSPATH}/${PACKAGE}" ${D}
    echo "covered ${UTILSPATH}/${PACKAGE} to ${D}/${PACKAGE}"
    rm -r "${D}/${RESOURCES}" && cp -r "${UTILSPATH}/${RESOURCES}" ${D}
    echo "covered ${UTILSPATH}/${RESOURCES} to ${D}/${RESOURCES}"
    
    cd ${D}
    rm -r node_modules package-lock.json
    npm install
    cd ../..
  fi
done