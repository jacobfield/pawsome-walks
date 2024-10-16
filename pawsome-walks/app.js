// import required modules
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  dogPalRequestsControllers,
  dogPalsControllers,
  dogsControllers,
  ownerFavouriteWalksControllers,
  ownersControllers,
  ownersDogsControllers,
  walkCommentsControllers,
  walksControllers,
} from "./controllers/controllers.js";

// initialize express app
const app = express();
app.use(cors());

// Middleware:
// Morgan is used for logging http requests in a readable format
app.use(morgan("dev"));

// express.json() nis used to parse incoming JSON requests
app.use(express.json());
app.use(express.static("public"));

//Declare routes here --------
// app.use("/route", importedRoute)

//owners table routes
app.use("/owners", ownersControllers.);






export default app;

// const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
