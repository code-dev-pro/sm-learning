import { CustomOperation } from './custom-number.types'

export const CustomInt: CustomOperation<number> = {
  fromString: (s: string) => {
    const n = parseInt(s)

    if (isNaN(n)) {
      throw new Error('Not a number')
    }

    return n
  },

  add: (n1: number, n2: number) => n1 + n2,
  multiply: (n1: number, n2: number) => n1 * n2,
  toString: (n: number) => n.toString()
}
