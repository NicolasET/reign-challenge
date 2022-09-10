# Install dependencies only when needed
FROM node:16.17.0 AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --frozen-lockfile

# Build the app with cache dependencies
FROM node:16.17.0 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


# Production image, copy all the files and run next
FROM node:16.17.0 AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --prod

COPY --from=builder /app/dist ./dist

CMD [ "node","dist/main" ]