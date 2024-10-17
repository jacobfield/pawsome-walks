import { createTableFunctions } from "./create/createTableFunctions.js";
import dropTables from "./drop/dropTables.js";
import seedWalksTable from "./seed/seedWalksTable.js";
import alterTablesAddingFK from "./create/alterTablesAddingFK.js";
import seedOwnersTable from "./seed/seedOwnersTable.js";
import seedDogsTable from "./seed/seedDogsTable.js";
import seedOwnerFavouriteWalksTable from "./seed/seedOwnerFavouriteWalksTable.js";
import seedDogPalTable from "./seed/seedDogPalTable.js";
import seedDogPalRequestsTable from "./seed/seedDogPalRequestsTable.js";
import seedOwnersDogsTable from "./seed/seedOwnersDogsTable.js";
import seedWalkCommentsTable from "./seed/seedWalkCommentsTable.js";
export default async function dbReset() {
  try {
    console.log("Running DB reset script...");

    await dropTables();
    await createTableFunctions.createOwnersTable();
    await seedOwnersTable();
    await createTableFunctions.createDogsTable();
    await seedDogsTable();
    await createTableFunctions.createWalksTable();
    await seedWalksTable();
    await createTableFunctions.createOwnerFavouriteWalksTable();
    await seedOwnerFavouriteWalksTable();
    await createTableFunctions.createDogPalsTable();
    await seedDogPalTable();
    // Ensure createOwnersDogsTable and createWalkCommentsTable are called only after createDogPalsTable completes
    await createTableFunctions.createDogPalRequestsTable();
    await seedDogPalRequestsTable();
    // Now, createOwnersDogsTable and createWalkCommentsTable
    await createTableFunctions.createOwnersDogsTable();
    await createTableFunctions.createWalkCommentsTable();
    await alterTablesAddingFK();
    await seedOwnersDogsTable();
    await seedWalkCommentsTable();

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
