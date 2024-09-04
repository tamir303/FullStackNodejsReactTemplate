export const devConfig = {
    port: process.env.PORT,
    dbUri: process.env.MONGO_URI,
    jwtSecret: process.env.SECRET_KEY,
    corsOptions: {
        origin: `http://localhost:3000`,
        credentials: true,
      },
}
