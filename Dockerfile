FROM node:20-alpine

# Creates a user node (non root user)
USER node

# Assigns working dir as given path
WORKDIR /home/node/app

# chown changes the owner, here it gives ownership to node(user)
COPY --chown=node package*.json ./

# It will take care of packages from package-lock.json
RUN npm ci

# Copy everything from here(source) to dest(WORKDIR ie /home/node/app)
COPY --chown=node . .

# Genetrates prisma client
RUN npx prisma generate

RUN npm run build

EXPOSE 80

CMD ["npm", "start"]