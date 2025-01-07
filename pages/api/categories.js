import { getCategories } from "../db";

export default async function handler(req, res) {
  try {
    const categories = await getCategories();

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
