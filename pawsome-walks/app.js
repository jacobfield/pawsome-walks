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
app.post("/owners", ownersControllers.postOwnerController);
app.get("/owners/:ownerId", ownersControllers.getOwnerByIdController);
app.put(
  "/owners/:ownerId/password",
  ownersControllers.updateOwnerPasswordController
);
app.delete("/owners/:ownerId", ownersControllers.deleteOwnerByIdController);
export default app;

//dogs table route
app.post("/dogs", dogsControllers.postDogController);
app.get("/dogs/:dogId", dogsControllers.getDogByIdController);
app.patch("/dogs/:dogId", dogsControllers.patchDogByIdController);
app.delete("/dogs/:dogId", dogsControllers.deleteDogByIdController);

//ownerDogs table controllers
app.post("/ownersDogs", ownersDogsControllers.postOwnersDogsController);
app.get(
  "/ownersDogs/:ownersId",
  ownersDogsControllers.getOwnersDogsByOwnersIdController
);
app.delete(
  "/ownerDogs/:dogId",
  ownersDogsControllers.deleteOwnersDogsByDogIdController
);

// ownerFavouriteWalks table Routes
app.post(
  "/ownerFavouriteWalks",
  ownerFavouriteWalksControllers.postOwnerFavouriteWalksController
);
app.get(
  "/ownerFavouriteWalks/:ownersId",
  ownerFavouriteWalksControllers.getOwnerFavouriteWalksByOwnerIdController
);
app.delete(
  "/ownerFavouriteWalks/:ownersId",
  ownerFavouriteWalksControllers.deleteOwnerFavouriteWalksByOwnerIdController
);

// dogPals table Routes
app.post("/dogPals", dogPalsControllers.postDogPalController);
app.get("/dogPals/:dogId", dogPalsControllers.getDogPalsByDogIdController);
app.delete(
  "/dogPals/:dogId1/:dogId2",
  dogPalsControllers.deleteDogPalsByBothIdsController
);

// walks table routes
app.get("/walks", walksControllers.getAllWalksController);
app.post("/walks", walksControllers.postWalkController);
app.get("/walks/:walkId", walksControllers.getWalksByIdController);

// dogPalRequests table routes
app.post(
  "/dogPalRequests",
  dogPalRequestsControllers.postDogPalRequestController
);
app.get(
  "/dogPalRequests/:receiverDogId",
  dogPalRequestsControllers.getDogPalRequestsByReceiverDogIdController
);
app.put(
  "/dogPalRequests/:dogPalRequestId/status",
  dogPalRequestsControllers.updateDogPalRequestController
);

// walkComments table routes
app.post("/walkComments", walkCommentsControllers.postWalkCommentsController);
app.get(
  "/walkComments/:walkId",
  walkCommentsControllers.getWalkCommentsByWalkIdController
);
app.delete(
  "/walkComments/:walkCommentId",
  walkCommentsControllers.deleteWalkCommentByIdController
);
// const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
