# :rocket: Node.js API MySQL

    An RESTful API build with Node.js, MySQL, Sequelize, Express.js

## System Requirements

- Node.Js
- Git

## Installation

1. Do the following commands for installing

```bash
git clone https://github.com/rizalpahlevi372/api-nodejs.git
cd api-nodejs
npm install
copy env.example .env
```

2. Create database **nodejs_auth**
3. Setting database name, username, password and host in your .env file
4. Do the following instructions if you're done setting database in your .env file

```bash
npx sequelize db:migrate
```

## To run the application

```bash
nodemon serve
```
