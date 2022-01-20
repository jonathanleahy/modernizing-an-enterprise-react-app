# Newline Guide to Modernizing an Enterprise React App - Hardware Handler

Welcome to Hardware Handler: the sample React application for the newline Guide to Modernizing an Enterprise React app. 

## Application Purpose & General Structure

Since this course is focused on modernizing an enterprise-style React application it's built in the style of a full-stack React application (`client/` folder housing the React application code and `server/` folder housing the Node.js/Express application code), however, when you look in the `server/` folder, the only files present are a `package.json` and `db.orig.json` file.

### The `server` Folder

This `server/` folder exists entirely to provide data (courtesy of the [JSON Server NPM package](https://www.npmjs.com/package/json-server) to simulate the CRUD (create, read, update, delete) functionality that would be present if the `client/` folder was connecting to multiple, real REST API microservices.

The JSON Server provides a quick backend for prototyping or mocking (or in this case, powering a sample app). And once the `server/` folder's JSON Server starts up, a new local db file is created (`db.json`) that keeps track of any updates made to the data via REST endpoints while the app is running. 

Once the application shuts down and the server's turned off, the `db.json` file is no longer referenced. And when the application starts again, the original state of the data will be restored from the `db.orig.json` file.

### The `client` Folder

The `client/` folder is where the bulk of this course happens. The frontend's built off an older version of Create-React-App (`react-scripts` v1.1.4 and `react` / `react-dom` v16.4.1). Suffice it to say, it's pre-React Hooks, which were introduced with the release `react` v16.8.0.

For this reason, the application components that depend on state are built as class-based components using React lifecycle methods. The `src/` folder is the main star here.

Most of these stateful components are filed in the `src/containers/` folder. The components only displaying views and data passed to them are in the `src/components/` folder. The data fetching calls, utilizing the [axios NPM package](https://www.npmjs.com/package/axios), are all stored in the `src/services/` folder and there's a few helper functions and constants stored in their respective folders that are utilized throughout the app.

Redux is not included as it was unnecessary for this application (and the argument could be made it is unneccessary for many React application it's introduced to). 

And because the application is written with such an old version of CRA (a version so old SASS was not easy to set up), the styling is written with vanilla CSS. In a true production app, this would probably be supplemented with [LESS](http://lesscss.org/), [SASS](https://sass-lang.com/), or [CSS-in-JS](https://cssinjs.org/), but for simplicity, to focus on the "React" part, vanilla CSS suffices and suitably separates the JavaScript code from the styling, which should make understanding and refactoring things a little easier.

## How To Install & Run Locally

Ok, now on to the local installation and startup.

First, it's recommended to run a stable version of [Node.js](https://nodejs.org/en/) v12 or above, and a version of [Yarn](https://classic.yarnpkg.com/en/docs/install) v1 or above.

After cloning this repo, open up the command line and `cd` into the `server/` folder. When your file path in the command line looks like `hardware-handler-0/server` run the command `yarn`.

Once that command has finished installing, `cd ..` back to the root of the project, then `cd client`. Now, when your command line file path looks like `hardware-handler-0/client` run the command `yarn` again. This should install all the client-side React dependencies.

After both folders have successfully installed, run `yarn start` in the command line, while still in the `client/` folder.

If all goes according to plan, a browser window with the URL `http://localhost:3000` should open up, and the "Welcome to Hardware Handler!" home screen should show up.# modernizing-an-enterprise-react-app
