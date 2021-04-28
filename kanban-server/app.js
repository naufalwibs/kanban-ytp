if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')
const router = require('./router/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Listening on Port : ${port}`)
})