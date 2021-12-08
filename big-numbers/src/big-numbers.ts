import { CustomNumber } from './custom-number.types'

export class BigNumber implements CustomNumber<any> {
  static fromString(s: string): BigNumber {
    return new BigNumber()
  }

  add(n: CustomNumber<any>): CustomNumber<any> {
    return new BigNumber()
  }

  getValue(): any {
    return undefined
  }

  multiply(n: CustomNumber<any>): CustomNumber<any> {
    return new BigNumber()
  }

  toString(): string {
    return ''
  }
}
