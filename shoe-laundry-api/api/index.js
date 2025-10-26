import express from "express";
import serverless from "serverless-http";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// CREATE
app.post("/items", async (req, res) => {
  const { nama_pelanggan, jenis_sepatu, status } = req.body;
  const { data, error } = await supabase
    .from("items")
    .insert([{ nama_pelanggan, jenis_sepatu, status }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

// READ (semua / filter status)
app.get("/items", async (req, res) => {
  const { status } = req.query;
  let query = supabase.from("items").select("*").order("tanggal_masuk", { ascending: false });

  if (status) query = query.eq("status", status);
  const { data, error } = await query;

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// READ (by id)
app.get("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("items").select("*").eq("id", id).single();

  if (error) return res.status(404).json({ error: "Data tidak ditemukan" });
  res.json(data);
});

// UPDATE
app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { nama_pelanggan, jenis_sepatu, status } = req.body;
  const { data, error } = await supabase
    .from("items")
    .update({ nama_pelanggan, jenis_sepatu, status })
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// DELETE
app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("items").delete().eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Data berhasil dihapus" });
});

export const handler = serverless(app);
