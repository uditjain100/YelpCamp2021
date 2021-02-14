const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: email,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportlocalmongoose);
