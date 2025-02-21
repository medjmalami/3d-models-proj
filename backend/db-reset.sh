#!/usr/bin/env bash
rm -rf drizzle
docker comopse rm messenger_db
sudo rm -rf ./postgres-data
bun drizzle-kit generate
docker-compose up -d 