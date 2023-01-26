import { CustomOperation } from './custom-number.types'

/**
 * Situation : JS ne traite pas les grands nombres comme on peut s'y attendre et génère des imprécisions lors d'opérations arythmétiques simples.
 * Problème : Comment traiter ces situations qui pourraient poser des problèmes dans des certains calculs qui nécessitent une grande précision comme dans le domaine spatial etc...
 * Question(s) : nombre uniquement positifs et entiers ? mettre en place un algo pour n'importe quelle situation ? (performance ?), faire des tests simples pour controler les traitements de js sur certains nombres,
 * À partir de quelle valeur, js considère q'un nombre est un grand nombre ?
 * dans le cadre d'une addition, on peut avoir une addition de deux nombres posifis ou négatifs, pour la multiplicatoion, possible d'avoir un nombre positif ou négatif
 */

export type BigNumber = any

const fromString = (s: string): BigNumber => undefined

const add = (n1: BigNumber, n2: BigNumber): BigNumber => undefined

const multiply = (n1: BigNumber, n2: BigNumber): BigNumber => undefined

const toString = (n: BigNumber) => ''

export const BigNumberOperation: CustomOperation<BigNumber> = {
  fromString,
  add,
  multiply,
  toString
}
