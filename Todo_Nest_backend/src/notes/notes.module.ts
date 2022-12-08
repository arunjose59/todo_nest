import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { LoginService } from 'src/login/login.service';
import { Login } from 'src/login/entities/login.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Login]),AuthModule],
  controllers: [NotesController],
  providers: [NotesService, LoginService],
})
export class NotesModule {}
