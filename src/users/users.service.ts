import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create({...createUserDto})
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({where: {id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(updateUserDto, {
      where: { id }
    })
    // return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return await this.usersRepository.destroy({ where: { id }})
  }
}
