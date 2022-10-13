const mongoose = require("mongoose")
const app = require("./app");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_ATLAS).then(()=>{
  console.log(`Database connection is successful`);
})

app.listen(port, () => {
    console.log(`Job Portal is Running; Port is: ${port}`);
  });
  