// Import required modules
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
  uploadControllers,
} from "../controllers/controllers.js";
import multer from "multer";

// Initialize express app
const app = express();

// Configure CORS to allow requests from specific origins
const whitelist = [
  "http://localhost:5173", // Local development
  "https://pawsome-walks.vercel.app", // Production
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.options("*", cors());
// Middleware
app.use(morgan("dev")); // Log HTTP requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.static("public")); // Serve static files

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Declare routes here --------

// Uploads table routes
app.post(
  "/api/uploads",
  upload.single("file"),
  uploadControllers.uploadPhotosController
);

// Owners table routes
app.post("/api/owners", ownersControllers.postOwnerController);
app.get("/api/owners/:ownerId", ownersControllers.getOwnerByIdController);
app.get("/api/owners", ownersControllers.getAllOwnersController);
app.put(
  "/api/owners/:ownerId/password",
  ownersControllers.updateOwnerPasswordController
);
app.delete("/owners/:ownerId", ownersControllers.deleteOwnerByIdController);

// Dogs table routes
app.post("/api/dogs", dogsControllers.postDogController);
app.get("/api/dogs/:dogId", dogsControllers.getDogByIdController);
app.patch("/api/dogs/:dogId", dogsControllers.patchDogByIdController);
app.delete("/api/dogs/:dogId", dogsControllers.deleteDogByIdController);

// OwnerDogs table controllers
app.post("/api/ownersDogs", ownersDogsControllers.postOwnersDogsController);
app.get(
  "/api/ownersDogs/:ownersId",
  ownersDogsControllers.getOwnersDogsByOwnersIdController
);
app.delete(
  "/api/ownersDogs/:dogId",
  ownersDogsControllers.deleteOwnersDogsByDogIdController
);

// OwnerFavouriteWalks table routes
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

// DogPals table routes
app.post("/api/dogPals", dogPalsControllers.postDogPalController);
app.get("/api/dogPals/:dogId", dogPalsControllers.getDogPalsByDogIdController);
app.delete(
  "/api/dogPals/:dogId1/:dogId2",
  dogPalsControllers.deleteDogPalsByBothIdsController
);

// Walks table routes
app.get("/api/walks", walksControllers.getAllWalksController);
app.post("/api/walks", walksControllers.postWalkController);
app.get("/api/walks/:walkId", walksControllers.getWalksByIdController);

// DogPalRequests table routes
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

// WalkComments table routes
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

// Export the app
export default app;
