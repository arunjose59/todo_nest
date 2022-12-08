import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService,
    private readonly jwtService: JwtService) {}

  @Post('/add')
  async create(@Body() createLoginDto: CreateLoginDto) {
    const hashedPassword = await bcrypt.hash(createLoginDto.password, 10);
    return this.loginService.create(createLoginDto.username, hashedPassword);
  }

  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Post('/name')
  async findOne(@Body() createLoginDto: CreateLoginDto) {
    const data = await this.loginService.findUser(createLoginDto);
    const jwt = await this.jwtService.signAsync ({id: data})
   
    return {jwt:jwt,id:data}
 
  }


}
