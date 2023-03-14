
import Patient, { PatientProperties } from '../domain/patient'
import PatientFactory from '../domain/patient-factory'
import { PatientRepository } from '../domain/patient.repository'
import { EmailVO } from '../domain/value-objects/email.vo'

let patients: Patient[] = []

const promisesPatients = [
   new PatientFactory().create('Matias', 'Gonzales', '12345678', 'address1', '998777888', EmailVO.create('mgonzales@gmail.com')),
   new PatientFactory().create('Irene', 'Perez', '87654321', 'address2', '958333110', EmailVO.create('iperez@gmail.com')),
]

Promise.all(promisesPatients).then(result => (patients = result))

export default class PatientInfraestructure implements PatientRepository {
   list(): PatientProperties[] {
      return patients.filter((el: Patient) => el.properties().active).map((el: Patient) => el.properties())
   }

   listOne(guid: string): Patient {
      return patients
         .filter((el: Patient) => el.properties().active)
         .find((el: Patient) => el.properties().guid === guid)
   }

   insert(patient: Patient): PatientProperties {
      patients.push(patient)
      return patient.properties()
   }

   update(patient: Patient): PatientProperties {
      const { guid } = patient.properties()
      const patientIndex: number = patients.findIndex((el: Patient) => el.properties().guid === guid)
      patients[patientIndex] = patient
      return patient.properties()
   }
}
