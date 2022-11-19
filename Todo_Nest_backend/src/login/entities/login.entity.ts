import { Note } from 'src/notes/entities/note.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  
} from 'typeorm';

@Entity()
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
  @OneToMany((type) => Note, (note) => note.login)
  notes: Note[];
}
