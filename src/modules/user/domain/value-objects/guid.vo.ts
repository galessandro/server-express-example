import { validate as uuidValidate } from 'uuid'
import { ValueObject } from './vo.class'

interface GuidProps {
   value: string
}

export class GuidVO extends ValueObject<GuidProps> {
   private constructor(props: GuidProps) {
      super(props)
   }

   static create(guid: string): GuidVO {
      if (!uuidValidate(guid)) {
         throw new Error('Invalid UUID')
      }

      return new GuidVO({ value: guid })
   }

   get value(): string {
      return this.props.value
   }
}
