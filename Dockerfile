FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

ENV DB_URL="mongodb://mongo:27017/redis"
ENV REDIS_USERNAME="Montaser Hassan"
ENV REDIS_PASSWORD="Mont@ser19"
ENV REDIS_HOST="redis"
ENV REDIS_PORT=6379

CMD [ "node", "index.js" ]