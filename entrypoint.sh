#!/usr/bin/env sh
echo "Running database hola..."
echo "Running database migrations..."
npx prisma migrate deploy
echo "Starting server..."
npm run start