#!/bin/sh
echo running create_frontend.sh ...
if [ ! -d frontend/ ];then
  echo start creating react app with typescript
  npx create-react-app frontend --template typescript
fi
