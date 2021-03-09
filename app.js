const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const db = require('./src/models');
const routes = require('./src/routes');

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());

// app.use(passport.initialize());

const port = process.env.PORT || 3000;


// app.get('/handcheck',(req,res)=>{
//     res.json({status:true});
// });


app.use('/api',routes);

app.use((req,res)=>{
    res.status(404).send('BACKOFFICE-ADMIN-SERVICE');
});



db.sequelize.sync({force : false,  timestamps: false, }).then(()=>{
    app.listen(port,()=>{
        console.log(`app is running on port ${port}`);
    });
}).catch((error)=>{
    console.log(`error connection with db ${error}`);
});
