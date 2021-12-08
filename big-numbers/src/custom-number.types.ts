export interface CustomNumber<T> {
  getValue(): T
  add(n: CustomNumber<T>): CustomNumber<T>
  multiply(n: CustomNumber<T>): CustomNumber<T>
  toString(): string
}
