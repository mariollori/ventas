import ventasrout from './Routes/routventa'
import authrout from './Routes/authrout'
const express = require('express')
const app = express();



var cors = require('cors')

app.use(cors())
app.use(express.json())
app.get('/', (req,res)=>{
    res.send('Welcome to the exam')
})

app.use('/api/auth',authrout);
app.use('/api/auth/user',ventasrout);

app.listen(8090)

