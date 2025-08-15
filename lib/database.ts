import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USR,
  password: process.env.MYSQL_PAS,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;

export async function getConnection() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

export interface PostData {
  id: number;
  title: string;
  upvotes: number;
  url: string;
  content: string;
  summary: string;
  assessment: string;
  audience: string;
  business_potential: string;
  uniqueness_score: number;
  key_insights: string;
  business_title: string;
  business_enhancement: string;
  business_ideas: string;
}

export async function getPostsByIndustry(industry: string): Promise<PostData[]> {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT * FROM ${industry} ORDER BY upvotes DESC, uniqueness_score DESC`
    );
    return rows as PostData[];
  } catch (error) {
    console.error('Database query error:', error);
    return [];
  }
}

export async function getPostById(industry: string, id: number): Promise<PostData | null> {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT * FROM ${industry} WHERE id = ?`,
      [id]
    );
    const results = rows as PostData[];
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Database query error:', error);
    return null;
  }
}