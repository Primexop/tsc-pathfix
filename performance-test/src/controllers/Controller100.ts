import { injectable } from 'tsyringe';
import { Service100 } from '@services/Service100';
import { Model100 } from '@models/Model100';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller100 {
  constructor(
    private service: Service100,
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
