import getDogPalRequestsByReceiverDogIdController from "./dogPalRequests-controllers/getDogPalRequestsByReceiverDogIdController.js";
import postDogPalRequestController from "./dogPalRequests-controllers/postDogPalRequestController.js";
import updateDogPalRequestController from "./dogPalRequests-controllers/updateDogPalRequestController.js";
import deleteDogPalsByBothIdsController from "./dogPals-controllers/deleteDogPalsByBothIdsController.js";
import getDogPalsByDogIdController from "./dogPals-controllers/getDogPalsByDogIdController.js";
import postDogPalController from "./dogPals-controllers/postDogPalController.js";
import deleteDogByIdController from "./dogs-controllers/deleteDogByIdController.js";
import getDogByIdController from "./dogs-controllers/getDogByIdController.js";
import patchDogByIdController from "./dogs-controllers/patchDogByIdController.js";
import postDogController from "./dogs-controllers/postDogController.js";
import getOwnerFavouriteWalksByOwnerIdController from "./ownerFavouriteWalks-controllers/getOwnerFavouriteWalksByOwnerIdController.js";
import postOwnerFavouriteWalksController from "./ownerFavouriteWalks-controllers/postOwnerFavouriteWalksController.js";
import deleteOwnerFavouriteWalksByBothIdsController from "./ownerFavouriteWalks-controllers/deleteOwnerFavouriteWalksByBothIdsController.js";
import deleteOwnerByIdController from "./owners-controllers/deleteOwnerByIdController.js";
import getOwnerByIdController from "./owners-controllers/getOwnerByIdController.js";
import postOwnerController from "./owners-controllers/postOwnerController.js";
import updateOwnerPasswordController from "./owners-controllers/updateOwnerPasswordController.js";
import deleteOwnersDogsByDogIdController from "./ownersDogs-controllers/deleteOwnersDogsByDogIdController.js";
import getOwnersDogsByOwnersIdController from "./ownersDogs-controllers/getOwnersDogsByOwnersIdController.js";
import postOwnersDogsController from "./ownersDogs-controllers/postOwnersDogsController.js";
import deleteWalkCommentByIdController from "./walkComments-controllers/deleteWalkCommentByIdController.js";
import getWalkCommentsByWalkIdController from "./walkComments-controllers/getWalkCommentsByWalkIdController.js";
import postWalkCommentsController from "./walkComments-controllers/postWalkCommentsController.js";
import getAllWalksController from "./walks-controllers/getAllWalksController.js";
import getWalksByIdController from "./walks-controllers/getWalksByIdController.js";
import postWalkController from "./walks-controllers/postWalkController.js";
import getAllOwnersController from "./owners-controllers/getAllOwnersController.js";
import { uploadPhotosController } from "./uploads/uploadPhotosController.js";
import postUploadWalksController from "./uploadsWalks-controllers/postUploadsWalksController.js";
import getUploadsWalksByWalkIdController from "./uploadsWalks-controllers/getUploadsWalksByWalkIdController.js";
import postUploadsOwnersController from "./uploadsOwners-controllers/postUploadsOwnersController.js";
import getUploadsOwnersByOwnerIdController from "./uploadsOwners-controllers/getUploadsOwnersByOwnerIdController.js";
import postUploadsDogsController from "./uploadsDogs-controllers/postUploadsDogsController.js";
import getUploadsDogsByDogIdController from "./uploadsDogs-controllers/getUploadsDogsByDogIdController.js";

export const uploadsWalksControllers = {
  postUploadWalksController,
  getUploadsWalksByWalkIdController,
};

export const uploadsOwnersControllers = {
  postUploadsOwnersController,
  getUploadsOwnersByOwnerIdController,
};

export const uploadDogsControllers = {
  postUploadsDogsController,
  getUploadsDogsByDogIdController,
};

export const uploadControllers = {
  uploadPhotosController,
};
export const ownersControllers = {
  postOwnerController,
  getOwnerByIdController,
  updateOwnerPasswordController,
  deleteOwnerByIdController,
  getAllOwnersController,
};
export const dogsControllers = {
  postDogController,
  getDogByIdController,
  patchDogByIdController,
  deleteDogByIdController,
};

export const ownersDogsControllers = {
  postOwnersDogsController,
  getOwnersDogsByOwnersIdController,
  deleteOwnersDogsByDogIdController,
};

export const ownerFavouriteWalksControllers = {
  postOwnerFavouriteWalksController,
  getOwnerFavouriteWalksByOwnerIdController,
  deleteOwnerFavouriteWalksByBothIdsController,
};

export const dogPalsControllers = {
  postDogPalController,
  getDogPalsByDogIdController,
  deleteDogPalsByBothIdsController,
};

export const walksControllers = {
  getAllWalksController,
  getWalksByIdController,
  postWalkController,
};

export const dogPalRequestsControllers = {
  postDogPalRequestController,
  getDogPalRequestsByReceiverDogIdController,
  updateDogPalRequestController,
};
export const walkCommentsControllers = {
  postWalkCommentsController,
  getWalkCommentsByWalkIdController,
  deleteWalkCommentByIdController,
};
