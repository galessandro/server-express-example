import Patient, { PatientProperties } from './patient'

export interface PatientRepository {
   list(): PatientProperties[]
   listOne(guid: string): Patient
   insert(patient: Patient): PatientProperties
   update(patient: Patient): PatientProperties
}
