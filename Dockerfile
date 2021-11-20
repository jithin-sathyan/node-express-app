# the container getting started will have node auto-installed
FROM node:14-alpine
# best way to pass ENV variables to node application
ENV MONGO_DB_USERNAME=mongoadmin \
    MONGO_DB_PWD=passkeyforadmin
# directory will be created inside the container
# RUN runs any linux command
RUN mkdir -p /home/app
RUN mkdir -p /home/app/src
RUN mkdir -p /home/app/views
# COPY gets executed on the host
COPY src /home/app/src
COPY views /home/app/views
COPY node_modules /home/app/node_modules
COPY ./package.json /home/app
COPY ./package-lock.json /home/app
COPY ./.gitignore /home/app

# CMD to execute the app
# entry point command
WORKDIR /home/app
CMD ["npm","start"]