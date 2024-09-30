import connectDB from "./db/db.js"
import app from "./App.js"
import 'dotenv/config'




connectDB().then(
    app.listen(process.env.PORT, ()=>{
        console.log(`server listening on ${process.env.PORT}`)
    })
)

