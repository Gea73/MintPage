import { pool } from "./db.js";
import { passwordHasher } from "../utils/passwordHasher.js";

import { UserRepo } from "../repositories/userRepository.js";
import { ResetTokenRepo } from "../repositories/resetTokenRepository.js";

import { UserService } from "../services/userService.js";
import { ResetTokenService } from "../services/resetTokenService.js";

import { LoginController } from "../controllers/loginController.js";
import { RegisterController } from "../controllers/registerController.js";
import { ResetPasswordController } from "../controllers/resetPasswordController.js";
import { ForgotPasswordController } from "../controllers/forgotPasswordController.js";
import { DashboardController } from "../controllers/dashboardController.js";

//Repositories
const userRepo = new UserRepo(pool);
const resetTokenRepo = new ResetTokenRepo(pool);
//Services
const userService = new UserService(userRepo, passwordHasher);
const resetTokenService = new ResetTokenService(resetTokenRepo);

//Controllers
const loginController = new LoginController(userService);
const registerController = new RegisterController(userService);
const resetPasswordController = new ResetPasswordController(
  userService,
  resetTokenService,
);
const forgotPasswordController = new ForgotPasswordController(
  userService,
  resetTokenService,
);
const dashboardController = new DashboardController();

export {
  loginController,
  registerController,
  resetPasswordController,
  forgotPasswordController,
  dashboardController,
};
