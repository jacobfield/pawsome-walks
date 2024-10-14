import { createOwnersTable } from "./create-owners-table.js";
import { createDogsTable } from "./create-dogs-table.js";
import { createWalksTable } from "./create-walks-table.js";
import { createOwnersDogsTable } from "./create-ownersDogs-table.js";
import { createOwnerFavouriteWalks } from "./create-ownerFavouriteWalks-table.js";
import { createDogPalRequestsTable } from "./create-dogPalRequests-table.js";
import { createDogPalsTable } from "./create-dogPals-table.js";
import { createWalkCommentsTable } from "./create-walkComments-table.js";

export const createTableFunctions = {
  createOwnersTable,
  createDogsTable,
  createWalksTable,
  createOwnersDogsTable,
  createOwnerFavouriteWalks,
  createDogPalRequestsTable,
  createDogPalsTable,
  createWalkCommentsTable,
};
