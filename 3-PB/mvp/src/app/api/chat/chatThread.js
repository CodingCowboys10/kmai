import pool from "@/app/api/utils/postgres";

export default async function handler(req, res) {
 try {
    const client = await pool.connect();
    const result = await client.query("SELECT title from chat_threads;");
    const data = result.rows;
    client.release();
    res.status(200).json({ message: "Successfully connected to the database", data: data });
 } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({ message: "Error connecting to the database", error: error.message });
 }
}
