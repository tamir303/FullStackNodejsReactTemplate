import chalk from "chalk";

const loggerMiddleware = async (req, res, next) => {
  const { method, url, headers, body, query } = req;
  const timestamp = new Date().toISOString();

  // Dont log passwords
  if (body?.password)
    body.password = "*******"

  // Log request details
  console.log(
    chalk.blue(`[${timestamp}]`),
    chalk.green(`${method} request to ${url}`)
  );
  console.log(chalk.yellow(`Query: ${JSON.stringify(query)}`));
  console.log(chalk.yellow(`Body: ${JSON.stringify(body, null, 2)}`));

  // Listen for the response to log status code
  res.on("finish", async () => {
    if (res.statusCode >= 400) {
      console.log(chalk.bold(`Response Status: ${res.statusCode}`));
      console.log(chalk.red(`Response Message: ${res.statusMessage}`))
    } else {
      console.log(chalk.bold(`Response Status: ${res.statusCode}`));
      console.log(chalk.blue(`Response Message: ${res.statusMessage}`))
    }
  });

  // Call the next middleware or route handler
  next();
};

export default loggerMiddleware;
