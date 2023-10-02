require('dotenv').config()
require('express-async-errors');

const express = require('express')

const app = express()
//packages
const morgan = require('morgan');

//CONNECTDB
const connectDB = require('./db/connect')

//ROUTES
const authRouter = require('./routes/authRoutes');

//MIDDLEWARE
const notFoundMiddleWare = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')

app.use(morgan('tiny'));
app.use(express.json())
app.get('/', (req, res) => {
    res.send('schedule api')
})

app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleWare)


const port = process.env.PORT || 4000
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening at port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()