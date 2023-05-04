import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import Role from "./Role.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
    roles_name: [{type: String}] 
  },
  { timestamps: true, versionKey: false }
);

// static signup method
userSchema.statics.signup = async function (email, password, roles) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  if(roles){
    const foundRoles = await Role.find({name: {$in: roles}})
    user.roles = foundRoles.map(role => role._id)
  } else {
    const role = await Role.findOne({name:"user"})
    console.log("role.name is",role.name)
    user.roles = [role._id]
    user.roles_name = [role.name]
  }

  const savedUser = await user.save()
  console.log("saved user is",savedUser)

  return savedUser;
};

// static login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

export default model("User", userSchema);

