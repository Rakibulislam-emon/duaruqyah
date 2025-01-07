// import { getCategories } from "../db";

import { getCategories } from "../db";

// export default async function handler(req, res) {
//   try {
//     const categories = await getCategories();

//     res.status(200).json(categories);
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }



export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" }); // Only allow GET requests
  }

  try {
    const categories = await getCategories();
    res.status(200).json(categories); // Send categories as JSON response
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
