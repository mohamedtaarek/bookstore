FROM node:18.12.1-alpine

WORKDIR /app

# Copy the requirements file
COPY package.json .

# Install the requirements
RUN npm install

RUN npm install -g nodemon

COPY . /app

RUN sequelize db:migrate
# Run the application
CMD ["npm", "start"]