# A sample blog application

This is a small application build using .NET Core and Angular 2 and D3.js. 
It is a very basic blog site created for the fictitious company Pressford Consulting

## Quick Start

### Requirements
 * Visual Studio
 * .NET Core

### Directions
1. Build the project with package restore avaliable
2. Hit play (F5) to run 

### Notes
 * There are seed accounts named `publisher` and `reader` any password will work.
 * This runs on an in memory database to run it on full sql server there is commented code in `Startup.cs`
 * The connection string can be changed in the `appsettings.json`

## Front end
To work on the front end you need do the following

### Requirements
 * Node package manager (NPM)

### Directions
1. In a terminal run `npm install -g angular-cli`
2. navigate to the client directory and run `ng serve`
3. You can now visit the site on `http://localhost:4200`