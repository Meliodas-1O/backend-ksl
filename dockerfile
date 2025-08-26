FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Make entrypoint executable
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Start app using the compiled JS
ENTRYPOINT ["sh", "./entrypoint.sh"]
