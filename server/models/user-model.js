import { request } from "express";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, required: true},
  activationLink: {type: String, required: true},
});

export default model('User', userSchema)