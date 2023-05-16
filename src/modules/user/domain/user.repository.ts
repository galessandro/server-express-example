import User from './user'

export interface UserRepository {
   // facade pattern: https://refactoring.guru/es/design-patterns/facade
   // list(): Promise<User[]>
   // listOne(guid: string): Promise<User>
   insert(user: User): Promise<User>
   // update(user: User): Promise<User>
}
