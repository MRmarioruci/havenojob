# Use an official Node.js runtime as the base image
FROM node:16 as builder

# Set the working directory in the container
WORKDIR /havenojob-client

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app for production
RUN npm run build

# Use a lightweight NGINX image as the base
FROM nginx:1.21-alpine

# Copy the built app from the previous stage
COPY --from=builder /havenojob-client/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to allow incoming traffic
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
