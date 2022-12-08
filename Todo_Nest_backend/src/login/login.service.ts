import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Login } from './entities/login.entity';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { CreateLoginDto } from './dto/create-login.dto';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private loginRepo: Repository<Login>,
  ) {}

  async create(username: string, hashedPassword: string): Promise<boolean> {
    try {
      // const login = this.loginRepo.create();
      await this.loginRepo.save({
        username: username,
        password: hashedPassword,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async findAll(): Promise<
    (options?: FindManyOptions<Login>) => Promise<Login[]>
  > {
    return await this.loginRepo.find;
  }

  async findOne(id: number): Promise<Login> {
    return await this.loginRepo.findOne({
      where: { id: id },
      relations: ['notes'],
    });
  }

  async findUser(
    createLoginDto:CreateLoginDto
  ): Promise<number | false> {
    const user = await this.loginRepo
      .findOne({
        where: {
          username: createLoginDto.username
        },
      })
      .catch((e)=>{
        throw new HttpException("Database Error",HttpStatus.BAD_GATEWAY)
      });
    // if (!user) return false;
    if(!user){
    throw new UnauthorizedException
  }
    if(!bcrypt.compare(user.password,createLoginDto.password)){
      return false;
    }
    return user.id
    }
  }
