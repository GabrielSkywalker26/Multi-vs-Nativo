FROM node:18-slim AS node-base

FROM openjdk:17-slim

# Copy node from node-base
COPY --from=node-base /usr/local/bin/node /usr/local/bin/
COPY --from=node-base /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

# Install Kotlin
RUN apt-get update && apt-get install -y curl zip && \
    curl -s https://get.sdkman.io | bash && \
    bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin"

# Set up paths for Kotlin
ENV PATH="/root/.sdkman/candidates/kotlin/current/bin:${PATH}"

WORKDIR /app
COPY . .

RUN npm install -g typescript ts-node

CMD ["bash", "run.sh"]
