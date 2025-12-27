// src/api/services/usersService.ts
import { RestClient } from '../restClient';
import { USERS } from '../endpoints';
import { APIRequestContext } from '@playwright/test';

export class UsersService {
  private client: RestClient;

  constructor(request: APIRequestContext) {
    this.client = new RestClient(request);
  }

  getAll() {
    return this.client.get(USERS);
  }

  getById(id: number) {
    return this.client.get(`${USERS}/${id}`);
  }

  create(body: object) {
    return this.client.post(USERS, body);
  }

  update(id: number, body: object) {
    return this.client.put(`${USERS}/${id}`, body);
  }

  patch(id: number, body: object) {
    return this.client.patch(`${USERS}/${id}`, body);
  }

  delete(id: number) {
    return this.client.delete(`${USERS}/${id}`);
  }
}
