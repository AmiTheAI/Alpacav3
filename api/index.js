// /api/index.js
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body; // frontend sends { prompt }

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ message: response.choices[0].message.content }); // <-- CORRECT
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
