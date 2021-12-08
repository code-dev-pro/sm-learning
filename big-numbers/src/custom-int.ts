import { CustomNumber } from './custom-number.types'

export class CustomInt implements CustomNumber<number> {
  private number: number

  constructor(number: number) {
    this.number = number
  }

  static fromString(s: string): CustomInt {
    const n = parseInt(s)

    if (isNaN(n)) {
      throw new Error('Not a number')
    }

    return new CustomInt(n)
  }

  add(n: CustomNumber<number>): CustomNumber<number> {
    return new CustomInt(n.getValue() + this.getValue())
  }

  getValue(): number {
    return this.number
  }

  multiply(n: CustomNumber<number>): CustomNumber<number> {
    return new CustomInt(n.getValue() * this.getValue())
  }

  toString(): string {
    return this.number.toString()
  }
}
