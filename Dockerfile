# Use official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose Render’s port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
