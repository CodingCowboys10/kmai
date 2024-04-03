#Use node 20.10.0 LTS
FROM node:20.10.0

#change the working directory on the docker image to /app
WORKDIR /app

#copy the package.json and package-lock.json to the /app directory
COPY package.json ./

#install the dependencies
RUN npm install

COPY . .

#run the application
CMD ["npm", "run", "dev"]