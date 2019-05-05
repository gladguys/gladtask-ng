# GLADTASK - FRONT-END (ANGULAR)

## Running gladtask-ng

### Development server

Run `npm run start-dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.



## Configuring project to deploy on Heroku

### 1. Angular CLI and compiler

In your package.json, copy

`"@angular/cli”: “1.4.9”,
"@angular/compiler-cli": "^4.4.6"`

from devDependencies to dependencies.

### 2. Create postinstall script in package.json

In package.json, under *scripts*, add:
`"heroku-postbuild": "ng build --prod"`

This tells Heroku to build the application using Ahead Of Time (AOT) compiler and make it production-ready. 

### 3. Indicates tools heroku should use to build the app

In package.json, add:

```
"engines": {
    "node": "8.10.0",
    "npm": "3.5.2"
  }
```
obs: attetion to set the right version. (tip: set it with the version you are running the app in dev mode)

### 4. Copying typescript reference

copy  "typescript": "~3.1.6" from devDependencies to dependency in *package.json*

### 5. Installing extra tools

`npm install enhanced-resolve@3.3.0 --save-dev`
`npm install express path --save`

### 6. Creating server.js

create file `server.js` in root of your project

server.js:
```javascript
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/<name-of-app>'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/<name-of-app>/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
```

pay attention to <name of project> and port


### 7. Change start command

To make heroku run the server.js file created in 6 section, change the value of start's script in package.json:

`"start": "node server.js"`




