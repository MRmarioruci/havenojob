# Use an official Node.js runtime as the base image
FROM node:16 as builder

# Set the working directory in the container
WORKDIR /iai-client

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the app's dependencies
RUN npm install

RUN npm run build

# Copy the rest of the app's source code
COPY . .

# Use a lightweight Nginx image as the base
FROM nginx:1.21-alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the built app from the previous stage to Nginx default location
COPY --from=builder /iai-client/build /usr/share/nginx/html

# Expose port 80 to allow incoming traffic
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
