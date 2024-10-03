import { Controller, Post, Body, Req, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (!username || !password) {
        throw new UnauthorizedException('Username and password are required');
    }

    const user = await this.authService.validateUser(username, password);
    if (user) {
      return this.authService.login(user);
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { username, password, firstName, lastName } = registerDto;

    if (!username || !password || !firstName || !lastName) {
        throw new ConflictException('All fields are required');
    }

    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    return this.usersService.create(username, password, firstName, lastName);
  }

  @Post('logout')
  async logout(@Req() request: Request) {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }
    return this.authService.signOut(token);
  }
}
