
import path from "path";
import dotenv from "dotenv";

const __dirname = import.meta.dirname;
dotenv.config({ path: path.join(__dirname, "../../.env") });

import { app } from "./app.js";
const PORT = Number(process.env.PORT || 5000);
//start the server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
