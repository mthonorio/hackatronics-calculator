import { CircuitCommonResults } from "~/types"

// Function to calculate the circuit results
export const calculateResults = ({
  Vcc,
  Rc,
  Re,
  Ib,
  Ic,
}: {
  Vcc: number
  Rc: number
  Re: number
  Ib: number
  Ic: number
}): CircuitCommonResults => {
  const Ie = Ic + Ib
  const Vce = Vcc - Ic * Rc
  const Ic_sat = Vcc / Rc
  const Vce_sat = 0.2 * Vcc
  const alpha_cc = Ic / Ie
  const Pd = Vce * Ic
  const Dot_Q = Vcc - Vce
  const Bcc_sat = Ic_sat / Ib
  return { Ib, Ic, Ie, Vce, Pd, Ic_sat, Vce_sat, alpha_cc, Dot_Q, Bcc_sat }
}

// Function to calculate results when Rb is zero
export const calculateResultsForRbZero = (
  Vbb: number,
  Vcc: number,
  Re: number,
  Rc: number,
  Ib: number
): CircuitCommonResults => {
  const Ve = Vbb - 0.7
  const Ie = Ve / Re
  const Ic = Ie
  const Vc = Vcc - Ic * Rc
  const Vce = Vc - Ve
  const Pd = Vce * Ic
  return { Ib, Ic, Ie, Vce, Pd }
}