import { Login } from 'src/login/entities/login.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  noteName: string;

  @ManyToOne((type) => Login, (login) => login.notes)
  login: Login;
}
