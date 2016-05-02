# fluro.boilerplate
A cordova boilerplate for making applications that link in with Fluro

# Setup and Usage


### Install, Bower and Cordova
In your terminal run the following
```
//Install Bower globally
npm install -g bower

//Install Cordova
npm install -g cordova

```

### Create Cordova Application
In the root directory create a cordova project using the code below (Replace with 'Starter' with your application name)
This will create a new folder 'dist'
```
//Setup Cordova
cordova create dist io.fluro.starter Starter

//Move into new dist directory
cd dist 

//Add os platforms you want to publish to
cordova platform add ios
cordova platform add android

```


### Install Node Modules
Install node modules in the root directory
```
//Move back up to the root directory
cd ../

//Install modules required in package.json
npm install
```


### Install Bower Components
Change into the app folder and install bower components
```
//Move into the app folder
cd app 

//Install Bower components
bower install
```

### Run Grunt 

Grunt is setup to concatenate and compile all of your Javascript and SCSS files contained within the 'build' folder as you develop.
It will also run a server at http://localhost:8080 that you can use to preview and test your application, this will reload everytime you save a file within the 'build' folder.
```
//Move back up into the root directory
cd ../

//Start Grunt script
grunt
```

### Build for Cordova

To build your application run 'grunt build' this will grab everything you need, minify it and copy everything from the 'app' folder into the 'dist/www' folder
```
//Build
grunt build
```






