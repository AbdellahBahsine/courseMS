import { IsString } from 'class-validator';

export class UserProfileDto {
    @IsString()
    username: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}