const express= require("express");
const cors = require("cors");
const app = express();
const jobsRoute=require("./router/jobs.route")
const userRoute=require("./router/user.route")
const managerRoute=require("./router/manager.route")



app.use(express.json());
app.use(cors());
app.use("/jobs", jobsRoute)
app.use("/user", userRoute)
app.use("/manager", managerRoute)


app.get("/", (req, res)=>{
    res.send("app is working")
})



module.exports = app