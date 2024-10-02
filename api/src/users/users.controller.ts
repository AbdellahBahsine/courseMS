import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Request() req): Promise<UserProfileDto> {
        const user = await this.usersService.findById(req.user.id);
        return {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        };
    }
}