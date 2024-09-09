# Use the official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if it exists) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the frontend application
RUN npm run build

# Install a simple server to serve static files
RUN npm install -g serve

# Expose the port that the app runs on
EXPOSE 3000

# Start the server to serve the built app
CMD ["serve", "-s", "build"]