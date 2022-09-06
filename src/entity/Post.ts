import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Length } from "class-validator";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
  })
  title: string;

  @Column({
    length: 200,
  })
  content: string;

  @Column()
  @Length(6, 255)
  password: string;
}
