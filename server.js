
const express=require("express")
const ImportData=require("./DataImport")
const productRouter=require("./Routes/ProductRouter.js")
const shopRouter=require("./Routes/ShopRouter.js")
const userRouter=require("./Routes/UserRoute.js")
const {notFound,errorHandler}=require("./Middleware/Errors.js")
const dotenv=require("dotenv")
const connectDatabase=require("./config/MongoDB.js")
dotenv.config()
connectDatabase({
    useNewUrlParser:true
})
const app=express();
app.use(express.json())
app.use("/api/import", ImportData);
app.use("/api/products", productRouter)
app.use("/api/shop", shopRouter)
app.use("/api/users", userRouter)

const path=require("path")
if (process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
}

app.use(notFound);
app.use(errorHandler);
app.get("/api/config/paypal",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
app.get("/",(req,res)=>{
    res.send("API is running on this port")
})
const PORT=process.env.PORT || 1000;
app.listen(PORT,console.log(`server is running on ${PORT}`))