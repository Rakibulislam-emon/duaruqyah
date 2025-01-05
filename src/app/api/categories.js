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
