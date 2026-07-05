FROM node:22-slim
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3030
CMD ["node", "server.js"]
