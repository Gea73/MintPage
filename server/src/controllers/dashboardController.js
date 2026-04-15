import path from "node:path";

const __dirname = import.meta.dirname;

export class DashboardController {
  async handler(req, res) {
    res.sendFile(
      path.join(__dirname, "../../../client/private/dashboard.html"),
    );
  }
}
