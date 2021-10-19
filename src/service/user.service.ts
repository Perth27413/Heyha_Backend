import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity'
import UserResponse from 'src/model/user/UserResponse'
import UserRegisterRequest from 'src/model/user/UserRegisterRequest'
import { ValidateException } from 'src/Exception/ValidateException'
import UserLoginRequest from 'src/model/user/UserLoginRequest';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  public async login(userLoginRequest: UserLoginRequest): Promise<UserResponse> {
    let result: UserResponse = new UserResponse
    let allUsers = await this.userRepo.find()
    if (this.checkEmailFormat(userLoginRequest.username)) {
      allUsers = allUsers.filter(item => item.email === userLoginRequest.username && item.password === userLoginRequest.password)
    } else {
      allUsers = allUsers.filter(item => item.username === userLoginRequest.username && item.password === userLoginRequest.password)
    }
    if (allUsers.length) {
      result = this.mapUserEntityToUserResponse(allUsers[0])
    } else {
      throw new ValidateException('ไม่พบชื่อผู้ใช้งานและรหัสผ่านนี้')
    }
    return result
  }

  public async register(userRequest: UserRegisterRequest): Promise<UserResponse> {
    let result: UserResponse = new UserResponse
    if (this.checkEmailFormat(userRequest.email) && this.checkUserRequestIsNotNull(userRequest)) {
      const saveUserEntityResponse = await this.userRepo.save(userRequest)
      result = this.mapUserEntityToUserResponse(saveUserEntityResponse)
    }
    return result
  }

  private checkUserRequestIsNotNull(userRequest: UserRegisterRequest): boolean {
    for (const key in userRequest) {
      if (!userRequest[key]) {
        throw new ValidateException('กรอกข้อมูลไม่ครบถ้วน')
      }
    }
    return true
  }

  private checkEmailFormat(email: string): boolean {
    const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email.toLowerCase())
  }

  private mapUserEntityToUserResponse(userEntity: User): UserResponse {
    let result: UserResponse = {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
      firstname: userEntity.firstname,
      lastname: userEntity.lastname,
      phone: userEntity.phone,
      address: userEntity.address
    }
    return result
  }
}