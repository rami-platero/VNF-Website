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
    throw Error(JSON.stringify({password: "This field must be filled", email: "This field must be filled"}));
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error(JSON.stringify({email:"Email already in use"}));
  }

  if (!validator.isEmail(email)) {
    throw Error(JSON.stringify({email: "Email is not valid"}));
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(JSON.stringify({password: "Password is not strong enough"}));
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  if(roles){
    const foundRoles = await Role.find({name: {$in: roles}})
    user.roles = foundRoles.map(role => role._id)
  } else {
    const role = await Role.findOne({name:"user"})
    user.roles = [role._id]
    user.roles_name = [role.name]
  }

  const savedUser = await user.save()

  return savedUser;
};

// static login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error(JSON.stringify({password: "This field must be filled", email: "This field must be filled"}));
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error(JSON.stringify({email:"This email hasn't been registered"}));
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error({password: "Incorrect password"});
  }

  return user;
};

export default model("User", userSchema);

