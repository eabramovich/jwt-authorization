import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";

class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email }); 
    if (candidate) {
      throw new Error(`Пользвотель с почтовым адресом ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    console.log('hashPassword', hashPassword);
    const activationLink = uuidv4();
    console.log('activationLink', activationLink);
    // Сохраняем пользователя в БД
    const user = await userModel.create({
      email,
      password: hashPassword,
      isActivated: false,
      activationLink,
    });
    await mailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user); //id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

const userService = new UserService();

export default userService;
