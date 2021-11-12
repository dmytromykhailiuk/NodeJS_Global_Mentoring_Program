import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../interfaces';
import { UserDTO } from '../dto';

class UserService {
  private users: IUser[] = [];

  getUsers(
    limit: number = this.users.length,
    loginSubstring: string = ''
  ): IUser[] {
    return this.filterUsersByLoginSubstring(loginSubstring).slice(0, limit);
  }

  getUserById(id: string): IUser {
    return this.users.find((user) => user.id === id);
  }

  createUser(userDTO: UserDTO): IUser {
    const newUser: IUser = {
      ...userDTO,
      id: uuidv4(),
      isDeleted: false,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(userData: UserDTO, userID: string): IUser {
    const index = this.users.findIndex((user) => user.id === userID);
    const updatedUser = { ...this.users[index], ...userData };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  deleteUser(id: string): IUser {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index].isDeleted = true;
    return this.users[index];
  }

  isExistingLogin(login: string): boolean {
    return this.users.some((user) => user.login === login);
  }

  isExistingID(id: string): boolean {
    return this.users.some((user) => user.id === id);
  }

  private filterUsersByLoginSubstring(loginSubstring: string): IUser[] {
    return this.users.filter((user) => user.login.includes(loginSubstring));
  }
}

export default new UserService();
