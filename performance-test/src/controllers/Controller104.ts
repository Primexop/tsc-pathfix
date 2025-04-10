import { injectable } from 'tsyringe';
import { Service104 } from '@services/Service104';
import { Model104 } from '@models/Model104';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller104 {
  constructor(
    private service: Service104,
    private prisma: PrismaClient
  ) {}

  async getAll() {
    return this.service.findAll();
  }

  async getById(id: string) {
    return this.service.findById(id);
  }

  async create(data: any) {
    return this.service.create(data);
  }

  async update(id: string, data: any) {
    return this.service.update(id, data);
  }

  async delete(id: string) {
    return this.service.delete(id);
  }
}
