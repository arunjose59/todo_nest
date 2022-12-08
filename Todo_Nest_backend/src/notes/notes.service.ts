import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from 'src/login/entities/login.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, loginData: Login) : Promise<Note> {
    const note = this.noteRepo.create({
      noteName: createNoteDto.noteName,
      login: loginData,
    })
    return await this.noteRepo.save(note).catch((e)=>{
      throw new HttpException("Database Error",HttpStatus.BAD_GATEWAY)
    });
  }

  async findAll(login: number): Promise<Note> {
    return await this.noteRepo.findOne({ where: { id: login } }).catch((e)=>{
      throw new HttpException("Database Error",HttpStatus.BAD_GATEWAY)
    });
 
    
  }

  async findOne(login1: Login) : Promise<Note[]>{
    return await this.noteRepo.find({ where: { login: login1 } }).catch((e)=>{
      throw new HttpException("Database Error",HttpStatus.BAD_GATEWAY)
    });
  }

  async update(updateNoteDto: UpdateNoteDto):Promise<UpdateResult> {
    return await this.noteRepo
      .update({ id: updateNoteDto.id }, { noteName: updateNoteDto.noteName })
      .catch((e)=>{
        throw new HttpException("Database Error",HttpStatus.BAD_GATEWAY)
      });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.noteRepo.delete({ id }).catch((e)=>{
      throw new HttpException("Database Error",HttpStatus.BAD_GATEWAY)
    });
  }
}
