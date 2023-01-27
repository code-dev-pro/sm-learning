import { CustomOperation } from './custom-number.types'

/**
 * Situation : JS ne traite pas les grands nombres comme on peut s'y attendre et génère des imprécisions lors d'opérations arythmétiques simples.
 * Problème : Comment traiter ces situations qui pourraient poser des problèmes dans des certains calculs qui nécessitent une grande précision comme dans le domaine spatial etc...
 * Question(s) : nombre uniquement positifs et entiers ? mettre en place un algo pour n'importe quelle situation ? (performance ?), faire des tests simples pour controler les traitements de js sur certains nombres,
 * À partir de quelle valeur, js considère q'un nombre est un grand nombre ?
 * dans le cadre d'une addition, on peut avoir une addition de deux nombres posifis ou négatifs, pour la multiplicatoion, possible d'avoir un nombre positif ou négatif
 */

export type BigNumber = string
const MAX = Number.MAX_SAFE_INTEGER // 9007199254740991

const toString = (n: string): string => n

const fromString = (s: string): string => {
  // retourne un nombre entier
  const n = parseInt(s)
  // contrôle le résultat de la conversion
  if (isNaN(n)) {
    throw new Error('Not a number')
  }
  return s
}

/**
 * IsBigNumber retourne true si l'argument (une chaîne de caractères) est supérieur à MAX.
 * @param {BigNumber} n - BigNumber
 */
const isBigNumber = (n: BigNumber): boolean => Number(n) > MAX

/**
 *  Converti en un tableau de caractères et inverse le tableau
 * @param {BigNumber} n - BigNumber
 * @returns Tableau de chaîne de caractères
 */
const toArray = (n: BigNumber): string[] => n.toString().split('').reverse()

/**
 *  Converti un tableau de nombres en chaîne de caractères
 * @param {BigNumber} n - BigNumber
 * @returns chaîne de caractères
 */
const fromArrayToString = (n: number[]): string => n.reverse().join('')

const isNegative = (n: BigNumber) => n.includes('-')

/**
 * Additionne deux nombres positifs ou deux nombres négatifs (sous forme d'une chaîne de caractères) et retourne le résultat de l'addition de ces deux nombres
 * @param {BigNumber} n1 - BigNumber
 * @param {BigNumber} n2 - BigNumber
 * @returns le résultat sous forme d'une chaîne de caractères
 */
const add = (n1: BigNumber, n2: BigNumber): BigNumber => {
  let isOpNegative = false
  let n1p = n1
  let n2p = n2
  if (
    (isNegative(n1) || isNegative(n2)) &&
    !isNegative(n1) &&
    !isNegative(n2)
  ) {
    throw new Error(`One of number is negative ${n1} / ${n2}`)
  }
  if (isNegative(n1) && isNegative(n2)) {
    isOpNegative = true
    n1p = n1.split('-')[1]
    n2p = n2.split('-')[1]
  }

  if (!isBigNumber(n1p) || !isBigNumber(n2p)) {
    console.log('Addition sans algo', n1, n2)
    return isOpNegative
      ? `-${(Number(n1p) + Number(n2p)).toString()}`
      : (Number(n1p) + Number(n2p)).toString()
  } else {
    console.log('Addition avec algo pour', n1, n2)
    const num1 = toArray(n1p)
    const num2 = toArray(n2p)
    // Initialiser les variables pour le retenu et le résultat
    let carry = 0
    const result = []
    // Evite le calcul à chaque itération
    const lgt = Math.max(num1.length, num2.length)
    // Boucle pour parcourir les chiffres de chaque nombre
    for (let i = 0; i < lgt; i++) {
      const a = num1[i] || 0
      const b = num2[i] || 0
      const sum = Number(a) + Number(b) + carry
      carry = sum >= 10 ? 1 : 0
      result.push(sum % 10)
    }
    if (carry === 1) {
      result.push(carry)
    }

    // Convertir le tableau de résultats en chaîne de caractères
    return isOpNegative
      ? `-${fromArrayToString(result)}`
      : fromArrayToString(result)
  }
}

/**
 * Multiplie deux nombres quelque soit leur signe (sous forme d'une chaîne de caractères) et retourne le résultat de la multiplication de ces deux nombres
 * @param {BigNumber} n1 - BigNumber
 * @param {BigNumber} n2 - BigNumber
 * @returns le résultat sous forme d'une chaîne de caractères
 */
const multiply = (n1: BigNumber, n2: BigNumber): BigNumber => {
  let isOpNegative = false
  if (isNegative(n1) || isNegative(n2)) {
    isOpNegative = true
  }
  if (isNegative(n1) && isNegative(n2)) {
    isOpNegative = false
  }
  const n1p = isNegative(n1) ? n1.split('-')[1] : n1
  const n2p = isNegative(n2) ? n2.split('-')[1] : n2

  if (
    Number(n1p) > MAX ||
    Number(n2p) > MAX ||
    Number(n1p) * Number(n2p) > MAX
  ) {
    console.log('Multiplication avec algo pour', n1p, n2p)
    const num1 = toArray(n1p)
    const num2 = toArray(n2p)
    const lgt1 = num1.length
    const lgt2 = num2.length
    const result = new Array(lgt1 + lgt2).fill(0)
    const lgtr = result.length
    for (let i = 0; i < lgt1; i++) {
      for (let j = 0; j < lgt2; j++) {
        result[i + j] += Number(num1[i]) * Number(num2[j])
      }
    }

    for (let k = 0; k < lgtr; k++) {
      if (result[k] > 9) {
        result[k + 1] += Math.floor(result[k] / 10)
        result[k] %= 10
      }
    }

    while (result[lgtr - 1] === 0) {
      result.pop()
    }
    return isOpNegative
      ? `-${fromArrayToString(result)}`
      : fromArrayToString(result)
  } else {
    console.log('Multiplication sans algo pour', n1p, n2p)
    const result = parseFloat(n1p.toString()) * parseFloat(n2p.toString())
    return isOpNegative ? `-${result.toString()}` : result.toString()
  }
}

export const BigNumberOperation: CustomOperation<BigNumber> = {
  fromString,
  add,
  multiply,
  toString
}
