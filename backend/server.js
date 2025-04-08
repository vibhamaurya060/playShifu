const express=require("express");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const connection = require("./config/db");
const cors = require('cors');
const port=process.env.PORT || 9090;
const app=express();
app.use(express.json());


app.use(cors({
    origin: 'https://play-shifu-henna.vercel.app',
    credentials: true 
  }));

app.get('/', (req, res)=>{
    res.send("This is an api")
})

app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(port, async()=>{
    try {
        await connection
        console.log("Mongodb database connected")
    } catch (error) { 
        console.log("Error while connecting database")
    }
    console.log(`Server is running on port http://localhost:${port}`)
})