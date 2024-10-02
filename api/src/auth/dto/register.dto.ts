import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters long.' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 128, { message: 'Password must be at least 8 characters long.' })
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_$@!%*?&])[A-Za-z\d-_@$!%*?&]{8,}$/, {
  //   message: 'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  // })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30, { message: 'First name must be between 1 and 30 characters long.' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30, { message: 'Last name must be between 1 and 30 characters long.' })
  lastName: string;
}