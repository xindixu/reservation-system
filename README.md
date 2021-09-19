# Reservation System

This reservation system aims at helping organizations scheduling recurring client visits.

Features:

- DnD calendar to schedule events
- Reminding managers about the next client visit
- Supports English and Chinese

Tech Stack:

- React
- Express
- Apollo Client & Server
- GraphQL
- Ant Design
- React-i18nNext

# Setup
- `cd frontend && yarn install`
- `cd backend && yarn install`
- `cd backend && touch .env`
# To run

- `cd frontend && yarn run start`
- `cd backend && yarn run start:dev`
- `elasticsearch`

# Deploy

- Commit files and run `git push heroku master`
- Config env vars in heroku

## Elasticsearch
Go to http://localhost:9200/clients to check for indexed data
