//design pattern factory: https://refactoring.guru/design-patterns/abstract-factory
import { v4 as uuidv4 } from 'uuid'
import Patient, { PatientProperties } from './patient'
import { EmailVO } from './value-objects/email.vo'

// design pattern factory: https://refactoring.guru/design-patterns/abstract-factory
export default class PatientFactory {
   create(name: string, lastname: string, dni: string, address: string, phone: string, email: EmailVO) {
      const patientProperties: PatientProperties = {
         name,
         lastname,
         dni,
         address,
         phone,
         email,
         guid: uuidv4(),
      }

      return new Patient(patientProperties)
   }
}
