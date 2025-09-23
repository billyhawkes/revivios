# 1. Base Bun setup
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# 2. Install dev dependencies for caching
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# 3. Install prod dependencies
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# 4. Pre-release stage for building
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production
ENV SERVER_PRESET=bun
RUN bun run build

# 5. Download Litestream binary in a separate stage
FROM alpine AS litestream
ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.8-linux-amd64-static.tar.gz /tmp/litestream.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/litestream.tar.gz && chmod +x /usr/local/bin/litestream

# 6. Final runtime image
FROM base AS release

RUN apt-get update && \
	apt-get install -y ca-certificates curl && \
	update-ca-certificates && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*

# App code and dependencies
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/bun.lock .
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/.output .output
COPY --from=prerelease /usr/src/app/drizzle.config.ts .
COPY --from=prerelease /usr/src/app/migrations ./migrations

# Litestream binary
COPY --from=litestream /usr/local/bin/litestream /usr/local/bin/litestream

# Litestream config & run script
COPY etc/litestream.yml /etc/litestream.yml
COPY run.sh /run.sh
RUN chmod +x /run.sh

# Optional: runtime deps (e.g. bash)
# RUN apk add --no-cache bash

# Expose port
EXPOSE 3000

# Start Litestream + your Bun app
CMD [ "/run.sh" ]
