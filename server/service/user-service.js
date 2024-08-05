import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";

class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email }); 
    if (candidate) {
      throw ApiError.BadRequest(`Пользвотель с почтовым адресом ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    // Сохраняем пользователя в БД
    const user = await userModel.create({
      email,
      password: hashPassword,
      isActivated: false,
      activationLink,
    });
    //await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user); //id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await userModel.findOne({activationLink});
    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
  }
}

const userService = new UserService();

export default userService;
