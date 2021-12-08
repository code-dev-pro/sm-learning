import { BigNumber } from './big-numbers'

describe('custom int test', () => {
  describe('from string test', () => {
    it('should return number if 0', () => {
      // Act
      const n = BigNumber.fromString('0')

      // Assert
      expect(n.toString()).toEqual('0')
    })

    it('should throw error if not a number', () => {
      // Act
      try {
        const n = BigNumber.fromString('toto')
      } catch (e) {
        // Assert
        expect(e).toEqual(new Error('Not a number'))
      }
    })
  })

  describe('add test', () => {
    // Arrange
    const useCases = [
      { n1: '0', n2: '0', expected: '0' },
      { n1: '10', n2: '100', expected: '110' },
      { n1: '1000', n2: '10000', expected: '11000' },
      { n1: '99', n2: '22', expected: '121' },
      {
        n1: '9007199254740991',
        n2: '90071992547409',
        expected: '9097271247288400'
      }
    ]

    useCases.forEach((useCase, index) => {
      it(`should match use case ${index}`, () => {
        // Act
        const n1 = BigNumber.fromString(useCase.n1)
        const n2 = BigNumber.fromString(useCase.n2)
        const res = n1.add(n2)

        // Assert
        expect(res.toString()).toEqual(useCase.expected)
      })
    })
  })

  describe('multiply test', () => {
    // Arrange
    const useCases = [
      { n1: '0', n2: '0', expected: '0' },
      { n1: '10', n2: '100', expected: '1000' },
      { n1: '1000', n2: '1', expected: '1000' },
      { n1: '99', n2: '11', expected: '1089' },
      {
        n1: '9007199254740991',
        n2: '90071992547409',
        expected: '811296384146058440262583142319'
      }
    ]

    useCases.forEach((useCase, index) => {
      it(`should match use case ${index}`, () => {
        // Act
        const n1 = BigNumber.fromString(useCase.n1)
        const n2 = BigNumber.fromString(useCase.n2)
        const res = n1.multiply(n2)

        // Assert
        expect(res.toString()).toEqual(useCase.expected)
      })
    })
  })
})
