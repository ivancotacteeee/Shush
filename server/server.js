import express from "express"
import bodyParser from "body-parser"
import YTMusic from "ytmusic-api"

const app = express()
const PORT = process.env.PORT || 5000

const ytmusic = new YTMusic()
await ytmusic.initialize

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Hello from the server!")
})

app.get("/test", (req, res) => {
    const searchTerm = req.query.q || "Imagine Dragons"
    ytmusic.search(searchTerm, "songs").then((results) => {
        res.json(results)
    }).catch((error) => {
        console.error("Error searching YouTube Music:", error)
        res.status(500).json({ error: "An error occurred while searching YouTube Music." })
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})