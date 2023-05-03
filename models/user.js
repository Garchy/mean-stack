var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
// var mongooseUniqueValidator = require("mongoose-unique-validator")

var schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  birthday: { type: Date, required: true },
  genre: { type: String, required: true },
  password: { type: String, required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

// schema.plugin(mongooseUniqueValidator)

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

schema.methods = {
  encryptPassword(password) {
    return bcrypt.hashSync(password, 8);
  },
  isPasswordValid(textPassword) {
    return bcrypt.compareSync(textPassword, this.password);
  },
};

module.exports = mongoose.model("User", schema);
