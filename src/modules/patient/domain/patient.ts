import { IEntity } from 'src/modules/shared/entity.interface'
import { EmailVO } from './value-objects/email.vo'

interface PatientRequired {
   name: string
   lastname: string
   dni: string
   email: EmailVO
}

interface PatientOptional {
   active: boolean
   address: string
   phone: string
   guid: string
}

type PatientUpdate = {
   name: string
   lastname: string
   dni: string
   address: string
   phone: string
   email: EmailVO
}

export type PatientProperties = Required<PatientRequired> & Partial<PatientOptional>

export default class Patient implements IEntity<PatientProperties, PatientUpdate> {
   private readonly guid: string
   private name: string
   private lastname: string
   private dni: string
   private active: boolean
   private address: string
   private phone: string
   private readonly email: EmailVO

   constructor(patientProperties: PatientProperties) {
      this.active = true
      Object.assign(this, patientProperties)
   }

   properties(): PatientProperties {
      return {
         guid: this.guid,
         name: this.name,
         lastname: this.lastname,
         dni: this.dni,
         active: this.active,
         address: this.address,
         phone: this.phone,
         email: this.email,
      }
   }

   update(fields: PatientUpdate) {
      Object.assign(this, fields)
   }

   delete() {
      this.active = false
   }
}
