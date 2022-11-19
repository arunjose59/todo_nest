import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from 'src/login/entities/login.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
  ) {}
  async create(createNoteDto: CreateNoteDto, loginData: Login) {
    const note = this.noteRepo.create({
      noteName: createNoteDto.noteName,
      login: loginData,
    });
    return await this.noteRepo.save(note);
  }

  findAll(login: number) {
    return this.noteRepo.findOne({ where: { id: login } });
  }

  findOne(login1: Login) {
    return this.noteRepo.find({ where: { login: login1 } });
  }
  findNote(login: Login) {
    return this.noteRepo.findOne({ where: { login: login } });
  }

  update(updateNoteDto: UpdateNoteDto) {
    return this.noteRepo.update(
      { id: updateNoteDto.id },
      { noteName: updateNoteDto.noteName },
    );
  }

  remove(id: number) {
    return this.noteRepo.delete({ id });
  }
}
