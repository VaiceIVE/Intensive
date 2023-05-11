require('dotenv').config()
const express = require('express');
const cors = require('cors');
const crossapiRouter = require('./routers/crossapiRouter');
const userRouter = require('./routers/userRouter')
const traceRouter = require('./routers/traceRouter')
const { urlencoded } = require('express');
const PORT = process.env.PORT || 8080
const db = require("./DB")



db()
const app = express();



app.use(cors({credentials: true, origin:['http://localhost:8000', 'http://1270.0.1:8000']}));
app.use(express.json())
app.use(urlencoded(true))



app.use('/api', crossapiRouter)
app.use('/api', traceRouter)
app.use('/api', userRouter)



app.listen(PORT, () => {console.log(`Listening ${PORT}`)});