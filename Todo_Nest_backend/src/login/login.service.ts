import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { Login } from './entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private loginRepo: Repository<Login>,
  ) {}
  async create(createLoginDto: CreateLoginDto) {
    try {
      const login = this.loginRepo.create(createLoginDto);
      await this.loginRepo.save(login);
      return true;
    } catch (error) {
      return false;
    }
  }

  findAll() {
    return this.loginRepo.find;
  }

  async findOne(id: number) {
    return this.loginRepo.findOne({ where: { id: id }, relations: ['notes'] });
  }
  async findUser(createLoginDto: CreateLoginDto) {
    const user = await this.loginRepo.findOne({
      where: {
        username: createLoginDto.username,
        password: createLoginDto.password,
      },
      relations: ['notes'],
    });
    if (!user) return false;
    else return user.id;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
