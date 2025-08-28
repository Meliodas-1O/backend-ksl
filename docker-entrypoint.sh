#!/bin/sh
npx prisma migrate deploy
node ./dist/src/app/server.js

