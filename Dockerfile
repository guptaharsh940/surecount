# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .


# Build the Next.js app
RUN npm run build

# Expose the port on which the Next.js app will run
EXPOSE 3000

# Start the Next.js app when the container starts
CMD ["npm", "start"]



