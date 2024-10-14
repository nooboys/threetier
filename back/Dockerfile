# Backend Dockerfile

# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install necessary dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend API port
EXPOSE 3000

# Command to start the API
CMD ["node", "app.js"]
