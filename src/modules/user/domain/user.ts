import { IEntity } from 'src/modules/shared/entity.interface'
import { EmailVO } from './value-objects/email.vo'

//interfaces
interface UserRequired {
   name: string
   lastname: string
   email: EmailVO
   password: string
}

interface UserOptional {
   refreshToken: string
   active: boolean
   guid: string
}

export type UserUpdate = {
   name: string
   lastname: string
   email: EmailVO
   password: string
}

export type UserProperties = Required<UserRequired> & Partial<UserOptional>

//modelo de dominio
export default class User implements IEntity<UserProperties, UserUpdate> {
   private name: string
   private lastname: string
   private readonly email: EmailVO
   private password: string
   private refreshToken: string
   private active: boolean
   private readonly guid: string

   constructor(userProperties: UserProperties) {
      this.active = true
      Object.assign(this, userProperties)
   }

   //methods
   properties(): UserProperties {
      return {
         name: this.name,
         lastname: this.lastname,
         email: this.email,
         password: this.password,
         refreshToken: this.refreshToken,
         active: this.active,
         guid: this.guid,
      }
   }

   update(fields: UserUpdate) {
      Object.assign(this, fields)
   }

   delete() {
      this.active = false
   }
}
