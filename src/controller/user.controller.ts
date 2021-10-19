import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import UserLoginRequest from 'src/model/user/UserRegisterRequest';
import UserRegisterRequest from 'src/model/user/UserRegisterRequest'
import UserResponse from 'src/model/user/UserResponse'
import { UserService } from 'src/service/user.service'

@Controller('api/user/')
export class UserController {

  constructor(
    private userService: UserService
  ) {}

  @Post('login')
  public async login(@Body() userLoginRequest: UserLoginRequest): Promise<UserResponse> {
    return this.userService.login(userLoginRequest)
  }

  @Post('register')
  public async register(@Body() userRequest: UserRegisterRequest): Promise<UserResponse>{
    return this.userService.register(userRequest);
  }

}