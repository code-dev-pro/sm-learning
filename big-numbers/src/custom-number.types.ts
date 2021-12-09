export interface CustomOperation<T> {
  fromString(s: string): T
  add(n1: T, n2: T): T
  multiply(n1: T, n2: T): T
  toString(n: T): string
}
