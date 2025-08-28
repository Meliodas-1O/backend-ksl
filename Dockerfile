# -- Builder stage
FROM mirror.gcr.io/node:20-alpine AS builder
WORKDIR /app
COPY tsconfig.json ./
COPY package*.json ./
# TODO: omit dev dependencies later to keep it clean
RUN npm ci
COPY . .
RUN npm run prisma-client
RUN npm run build

#  -- Runtime
FROM mirror.gcr.io/node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY docker-entrypoint.sh .
EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]

