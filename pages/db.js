// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';

// // Open the SQLite database
// export const getDatabase = async () => {
//   try {
//     return await open({
//       filename: './src/db/dua_main.sqlite',
//       driver: sqlite3.Database,
//     });
//   } catch (error) {
//     console.error('Error connecting to the database:', error.message);
//     throw new Error('Failed to connect to the database');
//   }
// };

// // Fetch categories from the database
// export const getCategories = async () => {
//   let db;
//   try {
//     db = await getDatabase();
//     const rows = await db.all('SELECT * FROM category');
//     return rows;
//   } catch (error) {
//     console.error('Error fetching categories:', error.message);
//     throw new Error('Failed to fetch categories');
//   } 
//   // finally {
//   //   // Ensure the database connection is closed after the operation
//   //   if (db) {
//   //     try {
//   //       await db.close();
//   //     } catch (closeError) {
//   //       console.error('Error closing the database connection:', closeError.message);
//   //     }
//   //   }
//   // }
// };


// src/pages/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the SQLite database (ensure it only runs on the server)
export const getDatabase = async () => {
  if (typeof window !== 'undefined') {
    throw new Error('Cannot use SQLite on the client side');
  }

  try {
    return await open({
      filename: './src/db/dua_main.sqlite',
      driver: sqlite3.Database,
    });
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw new Error('Failed to connect to the database');
  }
};


export const getCategories = async () => {
  let db;
  try {
    db = await getDatabase();
    const rows = await db.all('SELECT * FROM category');
    return rows;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw new Error('Failed to fetch categories');
  }
};
