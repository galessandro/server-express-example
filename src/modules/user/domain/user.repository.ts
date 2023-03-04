import User from './user'

export interface UserRepository {
   // facade pattern: https://refactoring.guru/es/design-patterns/facade
   list(): User[]
   listOne(id: number): User
   insert(user: User): User
   update(user: User): User
   delete(user: User): User
}
