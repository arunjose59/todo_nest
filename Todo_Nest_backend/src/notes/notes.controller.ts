import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { LoginService } from 'src/login/login.service';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly loginService: LoginService,
  ) {}

  @Post('/add')
  async create(@Body() createNoteDto: CreateNoteDto) {
    const loginData = await this.loginService.findOne(createNoteDto.login);
    return this.notesService.create(createNoteDto, loginData);
  }

  @Get('/all')
  async findAll(@Body('login') login: string) {
    return this.notesService.findAll(+login);
  }

  @Post('/list')
  async findOne(@Body('login') login: string) {
    const login1 = await this.loginService.findOne(+login);

    return this.notesService.findOne(login1);
  }

  @Patch('/edit')
  update(@Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(updateNoteDto);
  }

  @Delete('/delete')
  remove(@Body('id') id: string) {
    return this.notesService.remove(+id);
  }
}
