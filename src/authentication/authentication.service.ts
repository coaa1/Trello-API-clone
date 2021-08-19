import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import RegisterDto from '../users/dto/user.register.dto';
import * as bcrypt from 'bcrypt';
import TokenPayload from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { configService } from '../config/config.service';
import PostgresErrorCode from './postgress.errors.enum';
import { authenticationErrors } from './authentication.errors';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException(
          authenticationErrors.EMAIL_ALREADY_EXISTS,
        );
      }
      throw new InternalServerErrorException(
        authenticationErrors.INTERNAL_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new BadRequestException(authenticationErrors.WRONG_CREDENTIALS);
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new BadRequestException(authenticationErrors.WRONG_CREDENTIALS);
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${configService.getExpiration()}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
