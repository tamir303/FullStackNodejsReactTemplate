import chalk from "chalk";

const loggerMiddleware = async (req, res, next) => {
  const { method, url, headers, body, query } = req;
  const timestamp = new Date().toISOString();

  // Create a log object to accumulate log data
  const logData = {
    timestamp,
    method,
    url,
    query,
    body: { ...body },
    response: {},
  };

  // Hide passwords in logs
  if (logData.body?.password) {
    logData.body.password = "*******";
  }

  // Run api request
  next();

  // Listen for the response to log status code
  res.on("finish", async () => {
    logData.response.statusCode = res.statusCode;
    logData.response.statusMessage = res.statusMessage;

    const logString = `[${logData.timestamp}] ${logData.method} request to ${logData.url} with query ${JSON.stringify(logData.query)} and body ${JSON.stringify(logData.body)} resulted in a response with status code ${logData.response.statusCode} (${logData.response.statusMessage}).`;

    // Apply different colors based on the status code range
    if (res.statusCode < 100) {
      console.log(chalk.gray(logString)); // 0-99: Gray
    } else if (res.statusCode < 200) {
      console.log(chalk.blue(logString)); // 100-199: Blue
    } else if (res.statusCode < 300) {
      console.log(chalk.green(logString)); // 200-299: Green
    } else if (res.statusCode < 400) {
      console.log(chalk.yellow(logString)); // 300-399: Yellow
    } else if (res.statusCode < 500) {
      console.log(chalk.red(logString)); // 400-499: Red
    } else {
      console.log(chalk.magenta(logString)); // 500+: Magenta
    }
  });
};

export default loggerMiddleware;
