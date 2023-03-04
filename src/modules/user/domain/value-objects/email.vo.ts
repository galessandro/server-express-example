export class EmailVO {
   static create(email: string) {
      if (!email.match('asdf')) {
         throw new Error('Invalid email')
      }
      // return new EmailVO({ value: email })
   }
}
