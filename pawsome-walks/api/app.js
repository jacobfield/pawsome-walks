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
} from "../controllers/controllers.js";

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
app.post("/api/owners", ownersControllers.postOwnerController);
app.get("/api/owners/:ownerId", ownersControllers.getOwnerByIdController);
app.get("/api/owners", ownersControllers.getAllOwnersController);
app.put(
  "/api/owners/:ownerId/password",
  ownersControllers.updateOwnerPasswordController
);
// FIX SO THAT IT CAN CASCADE
app.delete("/owners/:ownerId", ownersControllers.deleteOwnerByIdController);
export default app;

//dogs table route
app.post("/api/dogs", dogsControllers.postDogController);
app.get("/api/dogs/:dogId", dogsControllers.getDogByIdController);
app.patch("/api/dogs/:dogId", dogsControllers.patchDogByIdController);
app.delete("/api/dogs/:dogId", dogsControllers.deleteDogByIdController);

//ownerDogs table controllers
app.post("/api/ownersDogs", ownersDogsControllers.postOwnersDogsController);
app.get(
  "/api/ownersDogs/:ownersId",
  ownersDogsControllers.getOwnersDogsByOwnersIdController
);
app.delete(
  "/api/ownersDogs/:dogId",
  ownersDogsControllers.deleteOwnersDogsByDogIdController
);

// ownerFavouriteWalks table Routes
app.post(
  "/api/ownerFavouriteWalks",
  ownerFavouriteWalksControllers.postOwnerFavouriteWalksController
);
app.get(
  "/api/ownerFavouriteWalks/:ownersId",
  ownerFavouriteWalksControllers.getOwnerFavouriteWalksByOwnerIdController
);

app.delete(
  "/api/ownerFavouriteWalks/:ownerId/:walkId",
  ownerFavouriteWalksControllers.deleteOwnerFavouriteWalksByBothIdsController
);

// dogPals table Routes
app.post("/api/dogPals", dogPalsControllers.postDogPalController);
app.get("/api/dogPals/:dogId", dogPalsControllers.getDogPalsByDogIdController);
app.delete(
  "/api/dogPals/:dogId1/:dogId2",
  dogPalsControllers.deleteDogPalsByBothIdsController
);

// walks table routes
app.get("/api/walks", walksControllers.getAllWalksController);
app.post("/api/walks", walksControllers.postWalkController);
app.get("/api/walks/:walkId", walksControllers.getWalksByIdController);

// dogPalRequests table routes
app.post(
  "/api/dogPalRequests",
  dogPalRequestsControllers.postDogPalRequestController
);
app.get(
  "/api/dogPalRequests/:receiverDogId",
  dogPalRequestsControllers.getDogPalRequestsByReceiverDogIdController
);
app.put(
  "/api/dogPalRequests/:dogPalRequestId/status",
  dogPalRequestsControllers.updateDogPalRequestController
);

// walkComments table routes
app.post(
  "/api/walkComments",
  walkCommentsControllers.postWalkCommentsController
);
app.get(
  "/api/walkComments/:walkId",
  walkCommentsControllers.getWalkCommentsByWalkIdController
);
app.delete(
  "/api/walkComments/:walkCommentId",
  walkCommentsControllers.deleteWalkCommentByIdController
);
// const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
