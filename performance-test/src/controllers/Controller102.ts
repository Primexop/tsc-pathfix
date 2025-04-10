import { injectable } from 'tsyringe';
import { Service102 } from '@services/Service102';
import { Model102 } from '@models/Model102';
import { PrismaClient } from '@prisma/client.js';

@injectable()
export class Controller102 {
  constructor(
    private service: Service102,
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
