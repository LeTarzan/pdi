FROM node:16

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

RUN ls | grep -vE "^(dist|node_modules)$" | xargs rm -rf
RUN npm prune --production

RUN ls

EXPOSE 3000

CMD ["npm", "start"]