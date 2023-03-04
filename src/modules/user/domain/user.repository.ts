import User, { UserProperties } from './user'

export interface UserRepository {
   // facade pattern: https://refactoring.guru/es/design-patterns/facade
   list(): UserProperties[]
   listOne(guid: string): User
   insert(user: User): UserProperties
   update(user: User): UserProperties
}
