import { injectable } from 'tsyringe';
import { Service57 } from '@services/Service57';
import { Model57 } from '@models/Model57';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller57 {
  constructor(
    private service: Service57,
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
