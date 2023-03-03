import User from './user'

export interface UserRepository {
   list(): User[]
   listOne(id: number): User
   insert(user: User): void
   update(user: User): void
   delete(user: User): void
}
