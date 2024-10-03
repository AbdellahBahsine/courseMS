import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  private readonly revokedTokens: Set<string> = new Set();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };
  }

  async signOut(token: string): Promise<{ message: string }> {
    this.revokedTokens.add(token);
    return { message: 'You have been signed out' };
  }

  isTokenRevoked(token: string): boolean {
    return this.revokedTokens.has(token);
  }
}
