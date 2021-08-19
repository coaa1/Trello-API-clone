# How to run
    docker-compose up -d
    npm install
    npm run pretypeorm
    npm run typeorm:migration:generate 
    npm run typeorm:migration:run
    rm src/migration/*
    
    npm run test
    npm run start:dev

(couldn't get Node and Postgres to work together in docker, so I left Postgres in docker, and API to be run locally)

# Things done
- CRUD operations for Boards, Lists, Cards, Comments
- Token-based authentication
- API usage limit
- Requests logging
- Unit tests for CRUD operations

# How to test
- Use Postman collection provided in the project `trello.postman_collection.json`
- Create an account by hitting POST request on 'authentication/register'
- Log in with password and email
- Experiment with crud operations with 
