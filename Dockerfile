FROM node:18-alpine

# Instana

COPY --from=icr.io/instana/aws-fargate-nodejs:latest /instana /instana
RUN /instana/setup.sh
ENV NODE_OPTIONS="--require /instana/node_modules/@instana/aws-fargate"

# Build App

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY src src

RUN npm install
RUN npm run build

RUN ls | grep -vE "^(dist|node_modules|package.json)$" | xargs rm -rf
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]