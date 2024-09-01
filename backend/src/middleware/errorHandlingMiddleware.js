import chalk from "chalk";

const errorHandlingMiddleware = (err, req, res, next) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();

  // Extract error message and stack trace
  const errorMessage = err.message;
  const stackTrace = err.stack.split('\n')[1].trim(); // Get the line number and file name

  // Log the error details
  console.error(chalk.red(`[${timestamp}] Error during ${method} request to ${url}: ${errorMessage} at ${stackTrace}`));

  // Send error response
  res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandlingMiddleware;
