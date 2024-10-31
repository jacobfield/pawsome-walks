# Pawsome Walks Learning Project

https://pawsome-walks.vercel.app/

Phase 1:

1. Initialized new React project via Vite with: `npm create vite@latest`
1. Installed SQLite3, then installed in project with: `npm i sqlite`
1. Installed .NET SDK via installer.
1. Initialized new .NET Core Web API project in the repository.
1. Installed React Router with: `npm i react-router-dom`
1. Installed Redux with: `npm i redux`
1. Installed JSON Server globally with: `npm i -g json-server`
1. Installed Fluent UI with: `npm i @fluentui/react`
1. Installed Material UI with: `npm install @mui/material @emotion/react @emotion/styled`
1. In .NET project, installed SQLite with: `dotnet add package Microsoft.EntityFrameworkCore.Sqlite`
1. In .NET project, installed .NET tools with: `dotnet add package Microsoft.EntityFrameworkCore.Tools`
1. In .NET project, installed SQL Server with: `dotnet add package Microsoft.EntityFrameworkCore.SqlServer`

Phase 2:

1. Gathered data, convert to JSON format
2. From this data, created low fidelity wireframes of the UI
3. Planned out the database schema, including table relationships, based on the UI's key features
4. From here< I planned out a HTTP table, which included all the routes and endpoints that I would need
5. I then set up an Express.js server, so that I could integrate backend functionality into the working project, with the intention to update it to a .NET backend in the future
6. Wrote out the SQL query to create the tables, including test data. Wrote a db rest script to drop all tables, recreate them, then seed them with data.
7. Created the helper functions, controllers, and routes for each of the 26 different endpoints
8. Deployed the project to Vercel

Phase 3:

1. Begun creating the frontend UI. Started with the header, importing the logo, searchbar, and navbar UI. Currently not got functionality in this, just a UI template.
2. Implemented the dark theme functionality
3. Begun to implement the frontend api calls, starting with one to 'get all walks', map through them to display, and then style appropriately, according to wireframes.
4. Realised that the deployed version api calls were failing. Remoddled the backend to utilise Vercel's serverless functions, ensuring that I would only need a single deployment for the project, for seamless communication. This meant prefixing moving the server to /api directory, and updating routes accordingly. Now both the front and backend are deployed on the same Vercel project, with the backend served as serverless functions, and the front as a static site.

# Set up production GitFlow version control

What I have learned:

- Pluralsight trainings have helped with stylings. I have learned how to use FlexBox, which has been utilised throughout the project.
- Context: I have learned how t use Context and the context provider. This has enabled me to use a theme, and a home made auth.

- What I would do differently:
  Early on in the project I made use of the Vercel serverless api routing. Although this has been great, and has meant that I have been able to deploy the backend and front end together in one place, it has made deployment and testing more difficult, because I have had to push to main to test any frontend api integration that I have made.
