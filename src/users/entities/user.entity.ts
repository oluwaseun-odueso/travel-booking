import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string

  @Column
  email: string;

  @Column
  password: string

  @Column
  nationality: string
}