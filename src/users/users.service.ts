import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as argon2 from "argon2";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

const saltRounds: number = process.env.SALT_ROUNDS as unknown as number;

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  googleLogin(req) {
    if(!req.user) {
      return 'No user from google'
    }
    return {
      message: 'User Info from Google',
      user: req.user
    }
  }

  async create(createUserDto: CreateUserDto) {
    const password = await this.hashPassword(createUserDto.password)
    await this.usersRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password,
      nationality: createUserDto.nationality
    })

    return await this.findByEmail(createUserDto.email)
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findByEmailIncludingPassword(loginUserDto.email)
    if(!user) throw new NotFoundException()

    const hashedPassword = user.password
    const passwordVerification = await this.verifyPassword(hashedPassword, loginUserDto.password)
    return await this.findByEmail(loginUserDto.email)
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll<User>({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt']}
    });
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOne({ 
      attributes: { exclude: ['password', 'createdAt', 'updatedAt']}, 
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt']}, 
      where: { email }
    })
  }

  async findByEmailIncludingPassword(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      attributes: { exclude: ['createdAt', 'updatedAt']}, 
      where: { email }
    })
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

  async hashPassword(password: string): Promise<string> {
    try {
      const hash = await argon2.hash(password)
      return hash
    } catch (error) {
      throw new Error(`Error hashing user's password: ${error}`);
    }
  }

  async verifyPassword(hash:string, plainText: string) {
    try {
      console.log(plainText)
      console.log(hash)
      const verify = await argon2.verify(hash, plainText)
      console.log(verify)
      return verify
    } catch (error) {
      throw new Error(`Error verifying user's password: ${error}`);
    }
  }
}
