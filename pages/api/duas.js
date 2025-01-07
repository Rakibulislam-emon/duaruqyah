import { getDatabase } from "../db";


export default async function handler(req, res) {
  const db = await getDatabase();

  try {
    const subcategoryId = req.query.subcategoryId;

    let duas;

    if (subcategoryId) {
      // Fetch Duas based on subcategory ID
      duas = await db.all("SELECT * FROM dua WHERE subcat_id = ?", [
        subcategoryId,
      ]);
    } else {
      // Fetch all Duas
      duas = await db.all("SELECT * FROM dua");
    }

    res.status(200).json(duas);
  } catch (error) {
    console.error("Error fetching duas:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
