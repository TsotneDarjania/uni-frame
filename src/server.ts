import express, { Request, Response } from "express";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

console.log(__dirname);

// Serve static files from the "public" directory
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
  // The static middleware will handle serving index.html
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
