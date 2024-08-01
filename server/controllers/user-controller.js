import userService from "../service/user-service.js";

export const registration = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const userData = await userService.registration(email, password);
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
    return res.json(userData);
  } catch (e) {
    console.log(e);
  }
};

export const login = async (req, res, next) => {
  try {
  } catch (e) {}
};

export const logout = async (req, res, next) => {
  try {
  } catch (e) {}
};

export const activate = async (req, res, next) => {
  try {
  } catch (e) {}
};

export const refresh = async (req, res, next) => {
  try {
  } catch (e) {}
};

export const getUsers = async (req, res, next) => {
  try {
    return res.json(["123", "456"]);
  } catch (e) {}
};

