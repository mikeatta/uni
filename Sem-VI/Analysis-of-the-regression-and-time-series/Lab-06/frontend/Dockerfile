FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy app's source
COPY . .

RUN npm run build

# Expose port and run the app
EXPOSE 3000
CMD ["npm", "start"]