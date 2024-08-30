import app from "./src/app.js";
import config from "./src/config/index.js";
import chalk from "chalk";

app.listen(config.port, () => {
  console.log(chalk.blue(chalk.bold(`Server now listening on port ${config.port}`)));
  console.log(
    chalk.yellow(chalk.bold(`Swagger UI available at http://localhost:${config.port}/api-docs`))
  );
});