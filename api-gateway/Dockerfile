# Use the official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if it exists) to the working directory
COPY package*.json ./

# Install production dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV PORT=8080

# Expose the port that the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]