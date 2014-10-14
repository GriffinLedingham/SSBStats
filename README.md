SSBStats
========

A Super Smash Bros Stat Tracking WebApp.

Run db.sql to set up your character, users, and games tables.

Run 

```
npm install 
```

while inside this repo folder to install all required node_modules.

Run 

```
node server.js
``` 

for development server, or 

```
node server.js --prod
``` 

for production server (using www.ssbstats.com).

Server will serve public/index.html at localhost:3000

On loading app.html, 

```
init()
```

is called within js/app.js. This then calls

```
getView('home', home_init)
```

where the first parameter is the template being loaded, and the second parameter is the function being called on load.

This is how pages are loaded into the content viewport throughout the app. Make sure that your page's script is included in app.html, and that your view is named appropriately in the views/ folder.

Call this function 

```
getView('YOUR_VIEW_NAME', YOUR_FUNCTION_CALL_ON_LOAD)
```

and your view will be loaded, with the desired JS function called when the view has finished loading.
