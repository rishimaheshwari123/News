const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { cloudinaryConnect } = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const connectDB = require("./config/db")

dotenv.config();

const PORT = process.env.PORT || 8080
connectDB();



// middleware 
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

// cloudinary connect 
cloudinaryConnect();


// routes  
app.use("/api/v1/auth", require("./routes/authRoute"))

// default route 
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Ha Bhai chal rha hu useke jaisa nhi me."
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port no ${PORT}`)
})
