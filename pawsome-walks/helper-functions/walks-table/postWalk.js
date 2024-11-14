import { pool } from "../../index.js";

export default async function postWalk(walkData) {
  const {
    walkname,
    location,
    lat,
    lng,
    walktype,
    offleadareas,
    paths,
    animalsonroute,
    toilets,
    wateronroute,
    scenic,
    parking,
  } = walkData;

  console.log("Helper FunctionReceived walkData:", walkData);

  try {
    const postNewWalks = `INSERT INTO walks (walkname, location, lat, lng, walktype, offleadareas, paths, animalsonroute, toilets, wateronroute, scenic, parking) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
    console.log("Received walkData:", walkData);

    const result = await pool.query(postNewWalks, [
      walkname,
      location,
      lat,
      lng,
      walktype,
      offleadareas,
      paths,
      animalsonroute,
      toilets,
      wateronroute,
      scenic,
      parking,
    ]);

    return result.rows[0];
  } catch (error) {
    console.error("Database query failed. walkData:", walkData);
    console.error("Error details:", error);
    throw error;
  }
}
