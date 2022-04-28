FROM node:16-alpine

#add pnpm
RUN npm install -g pnpm
#add turbo
RUN pnpm install -g turbo

# Set working directory
WORKDIR /app

# Install app dependencies
COPY  ["pnpm-lock.yaml", "package.json", "./"] 
# Install app dependencies
RUN pnpm install --production --quiet

# Copy source files
COPY . .

EXPOSE 8000

CMD ["pnpm", "deploy"]