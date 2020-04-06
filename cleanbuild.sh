#!/bin/bash 
docker-compose rm -f && docker volume prune -f
docker-compose up --build mongodb
