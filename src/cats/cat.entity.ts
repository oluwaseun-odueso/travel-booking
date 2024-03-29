import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Cat extends Model {
  @Column
  name: string;

  @Column
  airline: string;

  @Column
  class: string

  @Column
  takeOff: string

  @Column
  destination: string
}