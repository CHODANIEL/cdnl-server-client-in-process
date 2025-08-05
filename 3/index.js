const express = require("express")
const app = express()
const PORT = 3000

const userRouter =require("./routes/user")

app.use(express.json())
app.use("/users",userRouter)







app.get("/", (req, res) => {
    res.send("Hello Express!")
})
app.listen(PORT, () => {
    console.log("Server is running!")
})