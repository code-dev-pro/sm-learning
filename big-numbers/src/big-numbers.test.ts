import { BigNumberOperation } from './big-numbers'

describe('custom int test', () => {
  describe('from string test', () => {
    it('should return number if 0', () => {
      // Act
      const n = BigNumberOperation.fromString('0')

      // Assert
      expect(BigNumberOperation.toString(n)).toEqual('0')
    })

    it('should throw error if not a number', () => {
      // Act
      try {
        const n = BigNumberOperation.fromString('toto')
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
      { n1: '10.4', n2: '100', expected: '110.4' },
      { n1: '1000', n2: '10000', expected: '11000' },
      { n1: '99', n2: '22', expected: '121' },
      {
        n1: '9007199254740991',
        n2: '90071992547409',
        expected: '9097271247288400'
      },
      {
        n1: '9007199254740991',
        n2: '9007199254740991',
        expected: '18014398509481982'
      },
      {
        n1: '9007199254740992',
        n2: '9007199254740992',
        expected: '18014398509481984'
      },
      {
        n1: '9007199254740992',
        n2: '10007199254740992',
        expected: '19014398509481984'
      },
      {
        n1: '12345678910123456789',
        n2: '987654323109876543210',
        expected: '1000000002019999999999'
      },
      {
        n1: '987654323109876543210',
        n2: '987654323109876543210',
        expected: '1975308646219753086420'
      },
      {
        n1: '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
        n2: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
        expected:
          '123456789024691357802469135780246913578024691357802469135780246913578024691357802469135780246913578024691357802469135780246913578024691357802469135780'
      }
    ]

    useCases.forEach((useCase, index) => {
      it(`should match use case ${index}`, () => {
        // Act
        const n1 = BigNumberOperation.fromString(useCase.n1)
        const n2 = BigNumberOperation.fromString(useCase.n2)
        const res = BigNumberOperation.add(n1, n2)

        // Assert
        expect(BigNumberOperation.toString(res)).toEqual(useCase.expected)
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
      },
      {
        n1: '10007199254740995',
        n2: '2',
        expected: '20014398509481990'
      },
      {
        n1: '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
        n2: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
        expected:
          '1524157875323883675049535156256668194500838287337600975522511812231126352691000152415888766956267751867094662703856255022100304377381498325240055042522481346377076666750190519886267337309751562263087639079520012193273126047859425087639153757049236500533455762536198787501905199875019052100'
      }
    ]

    useCases.forEach((useCase, index) => {
      it(`should match use case ${index}`, () => {
        // Act
        const n1 = BigNumberOperation.fromString(useCase.n1)
        const n2 = BigNumberOperation.fromString(useCase.n2)
        const res = BigNumberOperation.multiply(n1, n2)

        // Assert
        expect(BigNumberOperation.toString(res)).toEqual(useCase.expected)
      })
    })
  })
})
