export type QPoint = {
  Vcc: number
  Ic_sat: number
  Vce: number
  Ie: number
}

export type CircuitCommonResults = {
  Ib: number
  Ic: number
  Ie: number
  Vce: number
  Pd: number
  Ic_sat?: number
  Vce_sat?: number
  alpha_cc?: number
  Dot_Q?: number
  Bcc_sat?: number
}

export type FormulaContents = {
  title: string
  formula: string
  image?: string
}