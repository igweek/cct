import express from "express";
import { createServer as createViteServer } from "vite";
import { Client } from "@notionhq/client";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      const notionApiKey = process.env.NOTION_API_KEY;
      const notionDatabaseId = process.env.NOTION_DATABASE_ID;

      if (!notionApiKey || !notionDatabaseId) {
        return res.status(500).json({ error: "Server configuration error: Missing Notion credentials" });
      }

      const notion = new Client({ auth: notionApiKey });

      await notion.pages.create({
        parent: {
          database_id: notionDatabaseId,
        },
        properties: {
          "姓名": {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          "邮箱": {
            email: email,
          },
          "电话": {
            phone_number: phone,
          },
          "咨询内容": {
            rich_text: [
              {
                text: {
                  content: message,
                },
              },
            ],
          },
        },
      });

      res.json({ success: true, message: "Message sent successfully" });
    } catch (error: any) {
      console.error("Notion API Error:", error);
      res.status(500).json({ error: "Failed to send message", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
