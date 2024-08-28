import { Stack } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, ScrollView, View } from 'react-native'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

// Define the types for the circuit parameters and results
type CircuitParams = {
  vbb: string
  vcc: string
  rb: string
  rc: string
  re: string
  gain: string
}

type CircuitResults = {
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

// Default initial values for circuit parameters
const initialParams: CircuitParams = {
  vbb: '',
  vcc: '',
  rb: '',
  rc: '',
  re: '',
  gain: '',
}

export default function Home() {
  const [params, setParams] = useState<CircuitParams>(initialParams)
  const circuitEmitterImage = require('../../assets/images/circuit_emitter.png')

  // Function to handle the change of text input fields
  const handleInputChange = (name: keyof CircuitParams, value: string) => {
    setParams((prevParams) => ({ ...prevParams, [name]: value }))
  }

  // Function to handle the calculation of the circuit
  const handleCalculateCircuit = () => {
    const { vbb, vcc, rb, rc, re, gain } = params
    const Vbb = parseFloat(vbb)
    const Vcc = parseFloat(vcc)
    const Rb = parseFloat(rb)
    const Rc = parseFloat(rc)
    const Re = parseFloat(re)
    let Gain = parseFloat(gain)

    // Validate inputs
    if (!validateInputs({ Vbb, Vcc, Rc, Re })) return

    const Ib = calculateIb(Vbb, Rb)
    let Ic = calculateIc(Ib, Gain)
    if (isNaN(Gain)) {
      Gain = Ic / Ib
    }

    if (Rb === 0 && Re > 0) {
      const results = calculateResultsForRbZero(Vbb, Vcc, Re, Rc, Ib)
      return showAlertWithResults(results)
    }

    const results = calculateResults({ Vcc, Rc, Re, Ib, Ic })
    showAlertWithResults(results)
  }

  // Function to validate the inputs
  const validateInputs = ({
    Vbb,
    Vcc,
    Rc,
    Re,
  }: {
    Vbb: number
    Vcc: number
    Rc: number
    Re: number
  }) => {
    if (isNaN(Vbb) || isNaN(Vcc) || isNaN(Rc) || isNaN(Re)) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios')
      return false
    }
    return true
  }

  // Function to calculate Ib
  const calculateIb = (Vbb: number, Rb: number) => {
    return (Vbb - 0.7) / Rb
  }

  // Function to calculate Ic
  const calculateIc = (Ib: number, Gain: number) => {
    return Gain * Ib
  }

  // Function to calculate results when Rb is zero
  const calculateResultsForRbZero = (
    Vbb: number,
    Vcc: number,
    Re: number,
    Rc: number,
    Ib: number
  ): CircuitResults => {
    const Ve = Vbb - 0.7
    const Ie = Ve / Re
    const Ic = Ie
    const Vc = Vcc - Ic * Rc
    const Vce = Vc - Ve
    const Pd = Vce * Ic
    return { Ib, Ic, Ie, Vce, Pd }
  }

  // Function to calculate the circuit results
  const calculateResults = ({
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
  }): CircuitResults => {
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

  // Function to display results in an alert
  const showAlertWithResults = (results: CircuitResults) => {
    const { Ib, Ic, Ie, Vce, Pd, Ic_sat, Vce_sat, alpha_cc, Dot_Q, Bcc_sat } = results
    Alert.alert(
      'Resultados',
      `Ib: ${Ib} A\nIc: ${Ic} A\nIe: ${Ie} A\nVce: ${Vce.toFixed(2)} V\nPd: ${Pd} W` +
        (Ic_sat ? `\nIc_sat: ${Ic_sat} A` : '') +
        (Vce_sat ? `\nVce_sat: ${Vce_sat} V` : '') +
        (alpha_cc ? `\nαcc: ${alpha_cc}` : '') +
        (Dot_Q ? `\nDot Q: ${Dot_Q} V` : '') +
        (Bcc_sat ? `\nBcc_sat: ${Bcc_sat}` : '')
    )
  }

  // Function to clear input fields
  const clearFields = () => {
    setParams(initialParams)
  }

  return (
    <>
      <Stack.Screen options={{ title: 'CDC - Emissor comum' }} />
      <View className="flex-1 p-4">
        <ScrollView>
          <View className="w-full p-2">
            <Image source={circuitEmitterImage} className="w-full" resizeMode="contain" />
          </View>
          <View className="gap-4 p-2">
            {Object.keys(params).map((key) => (
              <Input variant="secondary" key={key}>
                <Input.Field
                  placeholder={key.toUpperCase()}
                  keyboardType="numeric"
                  onChangeText={(value) => handleInputChange(key as keyof CircuitParams, value)}
                  value={params[key as keyof CircuitParams]}
                />
              </Input>
            ))}
            <Button title="Calculate" variant="primary" onPress={handleCalculateCircuit} />
            <Button title="Clear" variant="tertiary" onPress={clearFields} />
          </View>
        </ScrollView>
      </View>
    </>
  )
}
