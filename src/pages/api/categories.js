// import { getCategories } from "@/db/lib/db";

// export default async function handler(req, res) {
//   try {
//     const categories = await getCategories();
   
//     res.status(200).json(categories);
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }

import { getCategories } from "@/db/lib/db";

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://duaruqyah-jiw0edfx0-nahiyans-projects.vercel.app'); // Allow only your frontend domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers

  // Handle pre-flight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log("Connecting to database...");
    const categories = await getCategories();
    console.log("Fetched categories:", categories);

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message || error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

