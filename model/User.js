const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: [true, "Already have a account with this email"],
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough.",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords don't match!",
      },
    },

    role: {
      type: String,
      enum: ["candidate", "manager", "admin"],
      default: "candidate",
    },

    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    contactNumber: {
      type: String,
      validate: [validator.isMobilePhone, "Please provide a valid contact number"],
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive", "blocked"],
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    //  only run if password is modified, otherwise it will change every time we save the user!
    return next();
  }
  if(this.contactNumber){
    this.status="active"
  }

  const password = this.password;

  const hashedPassword = bcrypt.hashSync(password);

  this.password = hashedPassword;
  this.confirmPassword = undefined;
  

  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

/*
[
{
    "email": "subrata@admin.com",
    "password": "subrata123456#A",
    "confirmPassword": "subrata123456#A",
    "firstName": "Subrata",
    "lastName": "Sarker",
    "role": "admin",
    "contactNumber":"01521335328",
    "imageURL": "https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/267886125_3068683910085650_1500535234524419924_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UKsQ4hykSI4AX-6Ozum&_nc_ht=scontent.fdac31-1.fna&oh=00_AT-tT0vzcUZ3s49dz44X1dN2RBr7oSSzrVdO2Iniuj5gDg&oe=634A8B5B"
},
{
    "email": "subrata@candidate.com",
    "password": "subrata123456#A",
    "confirmPassword": "subrata123456#A",
    "firstName": "Subrata",
    "lastName": "Sarker",
    "role": "candidate",
    "contactNumber":"01521335328",
    "imageURL": "https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/267886125_3068683910085650_1500535234524419924_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UKsQ4hykSI4AX-6Ozum&_nc_ht=scontent.fdac31-1.fna&oh=00_AT-tT0vzcUZ3s49dz44X1dN2RBr7oSSzrVdO2Iniuj5gDg&oe=634A8B5B"
},
{
    "email": "subrata@manager.com",
    "password": "subrata123456#A",
    "confirmPassword": "subrata123456#A",
    "firstName": "Subrata",
    "lastName": "Sarker",
    "role": "manager",
    "contactNumber":"01521335328",
    "imageURL": "https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/267886125_3068683910085650_1500535234524419924_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UKsQ4hykSI4AX-6Ozum&_nc_ht=scontent.fdac31-1.fna&oh=00_AT-tT0vzcUZ3s49dz44X1dN2RBr7oSSzrVdO2Iniuj5gDg&oe=634A8B5B"
},

{
    "email": " admin@gmail.com",
    "password": "Admin123#",
    "confirmPassword": "Admin123#",
    "firstName": "Admin",
    "lastName": "Admin",
    "role": "admin",
    "contactNumber":"01521335328"
    "imageURL": "https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/267886125_3068683910085650_1500535234524419924_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UKsQ4hykSI4AX-6Ozum&_nc_ht=scontent.fdac31-1.fna&oh=00_AT-tT0vzcUZ3s49dz44X1dN2RBr7oSSzrVdO2Iniuj5gDg&oe=634A8B5B"
}]


//for manager
/*
"name":"Manager",
"email":"managerctg@test.com",
"password":"mezba123456##",
"confirmPassword":"mezba123456##",
"firtsName":"Manager of",
"lastName":"CTG",
"contactNumber":"11111111111",
"shippingAddress:"944 osthir Street",
"division":"chattogram",
"imageURL":"https://i.ibb.co/WnFSs9Y/unnamed.webp",
"status":"active",
"emergencyContactNumber":"01712345678",
"presentAddress":"944 osthir Street",
"permanentAddress":"944 Russell Street",
"nationalIdImageURL":"https://i.ibb.co/WnFSs9Y/unnamed.webp",



*/
