import winston from "winston"
import LogstashTransport from "winston-logstash-transport";

// Set up Winston to send logs to Logstash
const logger = winston.createLogger({
  transports: [
      new LogstashTransport.LogstashTransport({
        port: 5044,
        host: "localhost",
    }),
    new winston.transports.Console(),
  ],
});

const loggerMiddleware = async (req, res, next) => {
  const { method, url, headers, body, query } = req;
  const timestamp = new Date().toISOString();

  // Create a log object to accumulate log data
  const logData = {
    timestamp,
    method,
    url,
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

    const logString = `[API-GATEWAY: ${logData.timestamp}] ${logData.method} request to ${logData.url} resulted in a response with status code ${logData.response.statusCode} (${logData.response.statusMessage}).`;
    console.log(logString);
    logger.info(logString, logData)
  });
};

export default loggerMiddleware;
