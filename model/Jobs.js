const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema.Types;

// schema design
const jobsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this product."],
    trim: true,
    lowercase: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [100, "Name is too large"],
  },
  description: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  applyCandidate:[
    {
      type:String,
      default:null
    }
  ]
}, {
  timestamps: true,
})

// jobsSchema.pre("save", function(next){
//   const user=req.user;
//   this.creator=user.email

//   next();
// })

jobsSchema.post("save", function (doc, next) {

  let date = new Date().toLocaleDateString();
  if (doc.deadline == date) {
    doc.status == "Date expire"
  }

  next();
})



const Jobs = mongoose.model('Jobs', jobsSchema)



module.exports = Jobs;


/*
[
{
  "name":"Build a website And development",
  "description":"we need some web developer for Web development",
  "location":"Gazipur",
  "type":"Web Development",
  "salary":20000,
  "creator":"subrata@admin"
},
{
  "name":"Build a website And development",
  "description":"we need some junior web developer for Web development",
  "location":"chadpur",
  "type":"Web Development",
  "salary":16000,
      "deadline":"30/10/2022, 11:59:59"


},
{
  "name":"Build a banner And logo designer",
  "description":"we need some expert of graphic designer ",
  "location":"Horirampur",
  "type":"Graphic Design And Development",
  "salary":15000,
      "deadline":"30/10/2022, 11:59:59",
      "applyCandidate":[
        {
          type:String,
          default:" "
        }
      ]


},
{
  "name":"Social Marketing",
  "description":"we need some expert of social marketing ",
  "location":"chondra",
  "type":"Digital marketing",
  "salary":13000,
      "deadline":"30/10/2023, 11:59:59"


}]
*/
