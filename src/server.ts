import app from "./app";
import "dotenv/config";

const port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${port}🛡️
  ################################################
    `);
});
