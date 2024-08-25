export const defaultConfig = {
    port: 4000,
    dbUri: "mongodb://localhost:27017/default",
    jwtSecret: "supersecretkey",
    corsOptions: {
        origin: `http://localhost:3000`,
        credentials: true,
      },
}