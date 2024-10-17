import { pool } from "../../index.js";

export default async function postWalk({
  walkName,
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
  parking,
}) {
  try {
    const postNewWalks = `INSERT INTO walks (walkName, location, lat, lng, walkType, offLeadAreas, paths, animalsOnRoute, toilets, waterOnRoute, scenic, parking) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;

    const result = await pool.query(postNewWalks, [
      walkName,
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
      parking,
    ]);

    return result.rows[0];
  } catch (error) {
    console.error(
      "Error creating new walk. Error originated in postWalk.js",
      error
    );
    throw error;
  }
}
