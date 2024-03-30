#Use node 20.10.0 LTS
FROM node:20.10.0

#change the working directory on the docker image to /app
WORKDIR /app

#copy the package.json and package-lock.json to the /app directory
COPY package.json package-lock.json ./

#install the dependencies
RUN npm install

COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json
COPY components.json ./components.json
COPY postcss.config.js ./postcss.config.js
COPY tailwind.config.ts ./tailwind.config.ts

COPY ollamapull.sh /ollamapull.sh
RUN chmod +x /ollamapull.sh
CMD ["/ollamapull.sh"]


#run the application
CMD npm run dev
