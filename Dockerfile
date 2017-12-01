FROM macbootglass/myownportfolio-env
MAINTAINER thibault.theologien@insa-rouen.fr

VOLUME /root/dist/app
VOLUME /root/dist/plateform

COPY . /root/
RUN npm install
# RUN npm run build:icons -> does not work at this stage

CMD echo 'Exec something ...'
