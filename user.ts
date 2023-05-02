import { durableObject } from "@cloudflare/durable-object";
interface User {
  email: string;
  password: string;
}

class UserStorage {
  private users: { [email: string]: User } = {};

  async create(email: string, password: string): Promise<void> {
    this.users[email] = { email, password };
  }

  async read(email: string): Promise<User | undefined> {
    return this.users[email];
  }

  async update(email: string, password: string): Promise<void> {
    this.users[email].password = password;
  }

  async delete(email: string): Promise<void> {
    delete this.users[email];
  }
}

export const UserDO = durableObject(UserStorage);
