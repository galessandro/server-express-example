import { UserProperties } from 'src/modules/user/domain/user'
import { DTO } from './dto.interface'

interface UserDTO {
   name: string
   lastname: string
   email: string
   guid: string
}

export type UserInsertOneDTO = UserDTO

export class UserInsertMapping extends DTO<UserProperties, UserDTO> {
   execute(data: UserProperties): UserInsertOneDTO {
      return {
         name: data.name,
         lastname: data.lastname,
         email: data.email.value,
         guid: data.guid,
      }
   }
}
