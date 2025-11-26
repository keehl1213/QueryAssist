FROM node:22-slim
# error after node:22, should give access to /.npm directory
RUN mkdir -p /.npm && chown -R 1001:0 /.npm

# Lang
ENV LANG C.UTF-8
# Timezone
ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# install necessary apt
# RUN apt-get update && \
#   apt-get -y upgrade perl && \
#   apt-get install -y unzip libaio1 && \
#   apt-get clean && \
#   rm -rf /var/lib/apt/lists/*

ENV APP_HOME /app
WORKDIR $APP_HOME

# Change to a non-root user
USER node

# Copy files and install dependencies
COPY --chown=node:node  . .

# RUN rm $APP_HOME/.env
RUN npm install
EXPOSE 8443/tcp

CMD ["/bin/bash", "-c", "npm run migration:up;npm run start:prod"]
