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
// JS ne peut pas représenter exactement des nombres entiers supérieurs à 'MAX'

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
 * IsBigNumber retourne true si l'argument (nombre ou une chaîne de caractères) est supérieur à MAX.
 * @param {BigNumber} n - BigNumber
 */
const isBigNumber = (n: BigNumber): boolean => Number(n) > MAX

/**
 * teste le signe de l'argument (nombre ou une chaîne de caractères), s'il est positif et le renvoie
 * @param {BigNumber} n - BigNumber
 * @returns Une fonction qui prend un nombre ou une chaîne de caractères et renvoie un nombre ou une chaîne de caractères
 */
const isPositive = (n: BigNumber): BigNumber => {
  // teste si le nombre est positif
  if (Number(n) < 0) {
    throw new Error('Not positive')
  }
  return n
}

/**
 * Teste si l'argument (nombre ou une chaîne de caractères) est un nombre entier et le renvoie s'il est
 * @param {BigNumber} n - BigNumber
 * @returns Une fonction qui prend un nombre ou une chaîne de caractères et renvoie un nombre ou une chaîne de caractères
 */
const isInteger = (n: BigNumber): BigNumber => {
  // teste si le nombre est un nombre entier
  if (!Number.isInteger(n)) {
    throw new Error('Not a integer')
  }
  return n
}

/**
 *  Converti en un tableau de caractères et inverse le tableau
 * @param {BigNumber} n - BigNumber
 * @returns Tableau de chaîne de caractères
 */
const toArray = (n: BigNumber): string[] => {
  return n.toString().split('').reverse()
}

/**
 *  Converti un tableau de nombres en chaîne de caractères
 * @param {BigNumber} n - BigNumber
 * @returns chaîne de caractères
 */
const fromArrayToString = (n: number[]): string => {
  return n.reverse().join('')
}

const add = (n1: BigNumber, n2: BigNumber): BigNumber => {
  if (!isBigNumber(n1) || !isBigNumber(n2)) {
    console.log('Addition sans algo', n1, n2)
    return (Number(n1) + Number(n2)).toString()
  } else {
    console.log('Addition avec algo pour', n1, n2)
    const num1 = toArray(n1)
    const num2 = toArray(n2)
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
    return fromArrayToString(result)
  }
}

const multiply = (n1: BigNumber, n2: BigNumber): BigNumber => {
  if (Number(n1) > MAX || Number(n2) > MAX || Number(n1) * Number(n2) > MAX) {
    console.log('Multiplication avec algo pour', n1, n2)
    const num1 = toArray(n1)
    const num2 = toArray(n2)
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
    return fromArrayToString(result)
  } else {
    console.log('Multiplication sans algo pour', n1, n2)
    const result = parseFloat(n1.toString()) * parseFloat(n2.toString())
    return result.toString()
  }
}

export const BigNumberOperation: CustomOperation<BigNumber> = {
  fromString,
  add,
  multiply,
  toString
}
