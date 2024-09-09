import app from "./src/app.js";

const PORT = process.env.PORT || 8080

// Start Api-Gateway Service
app.listen(PORT, () => {
    console.log(`Api-Gateway is running on port ${PORT}`)
})