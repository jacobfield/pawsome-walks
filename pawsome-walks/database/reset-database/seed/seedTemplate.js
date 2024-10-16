import { pool } from "../../../index.js";

export default async function () {
  try {
  } catch (error) {
    console.error("Error seeding ... table. Error originated in ....js", error);
    console.error("Error Stack: ", error.stack);
  }
}
