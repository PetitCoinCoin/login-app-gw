FROM node:14.15.4-alpine3.10 as build

WORKDIR /app/ui

COPY ./ui ./
RUN npm ci
RUN npm run build

FROM python:3.8.7-slim-buster

WORKDIR /app/server
ENV PYTHONPATH "${PYTHONPATH}:/app"

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ./server ./
COPY --from=build /app/ui/build/ ../ui/build/

CMD python3 server.py db