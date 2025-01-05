export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://duaruqyah-jiw0edfx0-nahiyans-projects.vercel.app'); // Allow only your frontend domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers

  // Handle pre-flight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
