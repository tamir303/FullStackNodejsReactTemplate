import app from "./src/app.js";
import config from "./src/config/index.js";

app.listen(config.port, () => {
  console.log(`Server now listening on port ${config.port}`)
  console.log(`Swagger UI available at http://localhost:${config.port}/api-docs`);
});