# TrinaglTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.

# Install

- first clone the repo and switch to the release branch
```bash
  git clone https://github.com/Belal-Abo-Ata/TrinaglZ-Front-End-Task.git
  git switch release/first-release
```

*Install node modules*
```bash
  npm install
```

*Install json-server globally*

```bash
  npm install -g json-server
```
# Usage

- run the json-server on the provided db.json file
```bash
  json-server ./json-server/db.json
```
- then run the Angular server
 ```bash
    ng serve
```
- log in using one of the emails in db.json file (NOTE: there is a guard on the routes so you will not be able to use the project if you don't log in)
  - email: belal@gmail.com
  - password: 12345678
