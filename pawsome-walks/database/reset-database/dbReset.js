import { createTableFunctions } from "./create/createTableFunctions.js";
import dropTables from "./drop/dropTables.js";
import seedWalksTable from "./seed/seedWalksTable.js";
export default async function dbReset() {
  try {
    console.log("Running DB reset script...");
    await dropTables();
    await createTableFunctions.createOwnersTable();
    await createTableFunctions.createDogsTable();
    await createTableFunctions.createWalksTable();
    await createTableFunctions.createOwnersDogsTable();
    await createTableFunctions.createOwnerFavouriteWalksTable();
    await createTableFunctions.createDogPalRequestsTable();
    await createTableFunctions.createDogPalsTable();
    await createTableFunctions.createWalkCommentsTable();
    await seedWalksTable();
    console.log("Database has been reset.");
  } catch (error) {
    console.error(
      "Error running DB reset script. Error originated in dbReset.js:",
      error
    );
    console.error("EStack trace: ", error.stack);
  }
}
dbReset();
