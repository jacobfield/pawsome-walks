import getDogPalRequestsByReceiverDogId from "./dogPalRequests-table/getDogPalRequestsByReceiverDogId.js";
import postDogPalRequest from "./dogPalRequests-table/postDogPalRequest.js";
import updateDogPalRequest from "./dogPalRequests-table/updateDogPalRequest.js";
import deleteDogPalsByBothIds from "./dogPals-table/deleteDogPalsByBothIds.js";
import getDogPalsByDogId from "./dogPals-table/getDogPalsByDogId.js";
import postDogPal from "./dogPals-table/postDogPal.js";
import getDogById from "./dogs-table/getDogById.js";
import deleteDogById from "./dogs-table/deleteDogById.js";
import patchDogById from "./dogs-table/patchDogById.js";
import postDog from "./dogs-table/postDog.js";
import deleteOwnerFavouriteWalksByBothIds from "./ownerFavouriteWalks-table/deleteOwnerFavouriteWalksByBothIds.js";
import getOwnerFavouriteWalksByOwnerId from "./ownerFavouriteWalks-table/getOwnerFavouriteWalksByOwnerId.js";
import postOwnerFavouriteWalks from "./ownerFavouriteWalks-table/postOwnerFavouriteWalks.js";
import deleteOwnerById from "./owners-table/deleteOwnerById.js";
import getOwnerById from "./owners-table/getOwnerById.js";
import postOwner from "./owners-table/postOwner.js";
import updateOwnerPassword from "./owners-table/updateOwnerPassword.js";
import deleteOwnersDogsByDogId from "./ownersDogs-table/deleteOwnersDogsByDogId.js";
import getOwnersDogsByOwnersId from "./ownersDogs-table/getOwnersDogsByOwnersId.js";
import postOwnersDogs from "./ownersDogs-table/postOwnersDogs.js";
import deleteWalkCommentById from "./walkComments-table/deleteWalkCommentById.js";
import getWalkCommentsByWalkId from "./walkComments-table/getWalkCommentsByWalkId.js";
import postWalkComments from "./walkComments-table/postWalkComments.js";
import getWalksById from "./walks-table/getWalksById.js";
import getAllWalks from "./walks-table/getAllWalks.js";
import postWalk from "./walks-table/postWalk.js";
import getAllOwners from "./owners-table/getAllOwners.js";

export const walks = {
  getAllWalks,
  getWalksById,
  postWalk,
};

export const walkComments = {
  deleteWalkCommentById,
  getWalkCommentsByWalkId,
  postWalkComments,
};

export const ownersDogs = {
  deleteOwnersDogsByDogId,
  getOwnersDogsByOwnersId,
  postOwnersDogs,
};

export const owners = {
  deleteOwnerById,
  getOwnerById,
  postOwner,
  updateOwnerPassword,
  getAllOwners,
};

export const ownerFavouriteWalks = {
  deleteOwnerFavouriteWalksByBothIds,
  getOwnerFavouriteWalksByOwnerId,
  postOwnerFavouriteWalks,
};

export const dogs = {
  getDogById,
  deleteDogById,
  patchDogById,
  postDog,
};

export const dogPalRequests = {
  getDogPalRequestsByReceiverDogId,
  postDogPalRequest,
  updateDogPalRequest,
};

export const dogPals = {
  deleteDogPalsByBothIds,
  getDogPalsByDogId,
  postDogPal,
};
