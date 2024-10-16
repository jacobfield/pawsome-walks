import { createTableFunctions } from "./create/createTableFunctions.js";
import dropTables from "./drop/dropTables.js";
import seedWalksTable from "./seed/seedWalksTable.js";
import alterTablesAddingFK from "./create/alterTablesAddingFK.js";

export default async function dbReset() {
  try {
    console.log("Running DB reset script...");

    await dropTables();
    await createTableFunctions.createOwnersTable();
    await createTableFunctions.createDogsTable();
    await createTableFunctions.createWalksTable();
    await seedWalksTable();
    await createTableFunctions.createOwnerFavouriteWalksTable();
    await createTableFunctions.createDogPalRequestsTable();

    // Ensure createOwnersDogsTable and createWalkCommentsTable are called only after createDogPalsTable completes
    await createTableFunctions.createDogPalsTable();

    // Now, createOwnersDogsTable and createWalkCommentsTable
    await createTableFunctions.createOwnersDogsTable();
    await createTableFunctions.createWalkCommentsTable();
    await alterTablesAddingFK();

    console.log("Database has been reset.");
  } catch (error) {
    console.error(
      "Error running DB reset script. Error originated in dbReset.js:",
      error
    );
    console.error("Stack trace: ", error.stack);
  }
}

dbReset();
