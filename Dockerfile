FROM nginx:1.9
WORKDIR /usr/share/nginx/html
COPY ["index.html", "script.js", "style.css", "./"]
