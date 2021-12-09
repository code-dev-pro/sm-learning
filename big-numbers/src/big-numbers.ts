import { CustomOperation } from './custom-number.types'

export type BigNumber = any

const fromString = (s: string) => undefined

const add = (n1: BigNumber, n2: BigNumber) => undefined

const multiply = (n1: BigNumber, n2: BigNumber) => undefined

const toString = (n: BigNumber) => ''

export const BigNumberOperation: CustomOperation<any> = {
  fromString,
  add,
  multiply,
  toString
}
