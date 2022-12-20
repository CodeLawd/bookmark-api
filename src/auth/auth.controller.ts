import { AuthService } from './auth.service';
import { Body, Controller, Post } from "@nestjs/common";
import { AuthDTO, LoginDTO } from './dto';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDTO) {
    return this.authService.register(dto)
  }

  @Post('login')
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto)
  }
} 