# FROM idflogistics.azurecr.io/nginx
# COPY ./build /usr/share/nginx/html

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./build /usr/share/nginx/html
ENV TZ=Israel
RUN apk add --no-cache tzdata && cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]