require("dotenv").config();
const cors = require('cors');
const express = require("express");
const server = express();
const userRouter = require('./api/users/userRoute');
const inventoryRouter=require('./api/inventory/inventoryRoute')

server.use(cors())
server.use(express.urlencoded({extended:true}))
server.use(express.json())

server.use('/users',userRouter);
server.use('/inventory', inventoryRouter);


server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
