FROM macbootglass/myownportfolio-env
MAINTAINER thibault.theologien@insa-rouen.fr

COPY . /root/
RUN npm install

VOLUME /root/dist/app
VOLUME /root/dist/plateform

CMD npm run build:electron:prod
