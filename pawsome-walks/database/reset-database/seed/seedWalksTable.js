import { pool } from "../../../index.js";
import { walks } from "./walksData.js";

export default async function seedWalksTable() {
  try {
    for (const walk of walks) {
      // formatting walkType to match postgres' array format
      const formattedWalkType = `{${walk.walkType.join(",")}}`;
      await pool.query(
        `
            INSERT INTO walks (
            location,
            lat,
            lng,
            walkType,
            offLeadAreas,
            paths,
            animalsOnRoute,
            toilets,
            waterOnRoute,
            scenic,
            parking 
            ) VALUES (
             $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11          
            )`,
        [
          walk.location,
          walk.lat,
          walk.lng,
          formattedWalkType,
          walk.offLeadAreas,
          walk.paths,
          walk.animalsOnRoute,
          walk.toilets,
          walk.waterOnRoute,
          walk.scenic,
          walk.parking,
        ]
      );
    }
    console.log(`Walks table has been successfully seeded`);



















    
  } catch (error) {
    console.error(
      "Error seeding Walks table. Error originated in seedWalksTable.js",
      error
    );
    console.error("Error Stack: ", error.stack);
  }
}
