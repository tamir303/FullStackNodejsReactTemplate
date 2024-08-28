import chalk from "chalk";

const loggerMiddleware = (req, res, next) => {
  const { method, url, headers, body, query } = req;
  const timestamp = new Date().toISOString();

  // Log request details
  console.log(
    chalk.blue(`[${timestamp}]`),
    chalk.green(`${method} request to ${url}`)
  );
  console.log(chalk.yellow(`Query: ${JSON.stringify(query)}`));
  console.log(chalk.yellow(`Body: ${JSON.stringify(body, null, 2)}`));

  // Listen for the response to log status code
  res.on("finish", () => {
    console.log(`Response Status: ${res.statusCode}`);
  });

  // Call the next middleware or route handler
  next();
};

export default loggerMiddleware;
