import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @Inject('CATS_REPOSITORY')
    private catsRepository: typeof Cat
  ) {}

  async findAll(): Promise<Cat[]> {
    return await this.catsRepository.findAll<Cat>();
  }

  async findOne(id: number): Promise<Cat> {
    return await this.catsRepository.findOne<Cat>({where: {id}})
  }

  // async create (payload: CreateCatDto) {
  //   try {
  //     return await this.catsRepository.create(payload)
  //   } catch (error) {
  //     throw new BadRequestException()
  //   }
  // }
}

