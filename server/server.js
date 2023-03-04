import express from 'express'
import devBundle from './devBundle'
import path from 'path'
import template from './../template'
import { MongoClient } from 'mongodb'

const app = express()

//For serving static files
const CURRENT_WORKING_DIR = process.cwd()
app.use('./dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


//route handling
app.get('/', (req, res) => {
    res.status(200).send(template())
})

// configuring express app to listen to port 3000 for incoming requests
let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
    if (err) {
        console.log(err)
    }
    console.log('Server started on port %s.', port)
})

//mongodb connection
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/first-project'
MongoClient.connect(url, (err, db) => {
    console.log("connected successfully to mongodb server")
    db.close()
})

devBundle.compile(app)