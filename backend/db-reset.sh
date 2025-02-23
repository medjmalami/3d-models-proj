#!/usr/bin/env bash
rm -rf drizzle
docker comopse rm 3dModels_db
sudo rm -rf ./postgres-data
bun drizzle-kit generate
docker-compose up -d 