import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from '../users/dto/user.register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() res) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return res.send(user);
  }

  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }

}
