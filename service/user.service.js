
const User = require("../model/User");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.findUserByToken = async (token) => {
  return await User.findOne({ confirmationToken: token });
};
exports.getCandidateService = async () => {
  return await User.find({role:"candidate"});
};
// exports.getCandidateByIdService = async (id) => {
//   return await User.findById();
// };