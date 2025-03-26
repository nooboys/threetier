# Use the official Nginx base image
FROM nginx:latest

# Copy custom HTML file to the Nginx server directory
COPY index.html /usr/share/nginx/html/index.html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
