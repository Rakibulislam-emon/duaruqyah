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
//   } finally {
//     // Ensure the database connection is closed after the operation
//     if (db) {
//       try {
//         await db.close();
//       } catch (closeError) {
//         console.error('Error closing the database connection:', closeError.message);
//       }
//     }
//   }
// };



import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export const getDatabase = async () => {
  let dbPath;
  
  // Check if we're in production (Vercel environment)
  if (process.env.VERCEL_ENV) {
    // In production, use the /tmp directory
    dbPath = path.resolve('/tmp', 'dua_main.sqlite');
  } else {
    // In development, use the local database file
    dbPath = path.resolve('./src/db', 'dua_main.sqlite');
  }

  try {
    // Open the SQLite database
    return await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw new Error('Failed to connect to the database');
  }
};

// Fetch categories from the database
export const getCategories = async () => {
  let db;
  try {
    db = await getDatabase();
    const rows = await db.all('SELECT * FROM category');
    return rows;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw new Error('Failed to fetch categories');
  } finally {
    // Ensure the database connection is closed after the operation
    if (db) {
      try {
        await db.close();
      } catch (closeError) {
        console.error('Error closing the database connection:', closeError.message);
      }
    }
  }
};
