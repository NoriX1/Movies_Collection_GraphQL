[This project](https://movies-collection-app.herokuapp.com/) was written while studying GraphQL in Frontend (React.js) and Backend (Express.js) development.
This app also requires mongoDB.
Main feature of this app is to create, read, update, delete instances in (from) mongoDB,
using [GraphQL](https://graphql.org/) and [Apollo Client](https://www.apollographql.com/docs/react/)

## Available Scripts
Before starting the app you need to install client and server dependencies:
npm install
npm install --prefix client
npm install --prefix server

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Also you can:
Open [http://localhost:5000/graphql](http://localhost:5000/graphql) to see GraphQL UI for testing your queries.

### `npm test --prefix client`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build --prefix client`

Builds the app for production to the `public` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
[This project is deployed to Heroku](https://movies-collection-app.herokuapp.com/)