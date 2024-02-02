import express from "express";
import * as path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
// Serve static files from the "public" directory
app.use(express.static(path.resolve(__dirname, "public")));
console.log("");
app.get("/", (req, res) => {
    // The static middleware will handle serving index.html
    res.sendFile(path.resolve(__dirname, "index.html"));
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=server.js.map