import { Stack } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert, Image, ScrollView, View } from 'react-native'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { ResultsView } from '~/components/ResultsView'
import { CircuitCommonResults, QPoint } from '~/types'
import { calculateResults, calculateResultsForRbZero } from '~/utils/common_circuit'
import { formatElectricalUnit } from '~/utils/number'

const circuitEmitterImage = require('../../assets/images/circuit_emitter.png')

// Define the types for the circuit parameters and results
type CircuitParams = {
  vbb: string
  vcc: string
  rb: string
  rc: string
  re: string
  gain: string
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

const parseCircuitParams = (params: CircuitParams) => ({
  Vbb: parseFloat(params.vbb),
  Vcc: parseFloat(params.vcc),
  Rb: parseFloat(params.rb),
  Rc: parseFloat(params.rc),
  Re: parseFloat(params.re),
  Gain: parseFloat(params.gain),
})

export default function Home() {
  const [params, setParams] = useState<CircuitParams>(initialParams)
  const [result, setResult] = useState<string>()
  const [pointQ, setPointQ] = useState<QPoint>()

  // Function to handle the change of text input fields
  const handleInputChange = (name: keyof CircuitParams, value: string) => {
    setParams((prevParams) => ({ ...prevParams, [name]: value }))
  }

  // Function to handle the calculation of the circuit
  const handleCalculateCircuit = useCallback(() => {
    const parsedParams = parseCircuitParams(params)
    const { Vbb, Vcc, Rb, Rc, Re, Gain } = parsedParams

    // Validate inputs
    if (!validateInputs(parsedParams)) return

    const Ib = calculateIb(Vbb, Rb)
    let Ic = calculateIc(Ib, Gain)
    let gain = Gain
    if (isNaN(Gain)) {
      gain = Ic / Ib
    }

    if (Rb === 0 && Re > 0) {
      const results = calculateResultsForRbZero(Vbb, Vcc, Re, Rc, Ib)
      return setResult(formatResults(results))
    }

    const results = calculateResults({ Vcc, Rc, Re, Ib, Ic }) as CircuitCommonResults & {
      Ic_sat: number
    }
    setPointQ({ Vcc: parsedParams.Vcc, Ic_sat: results.Ic_sat, Vce: results.Vce, Ie: results.Ie })
    setResult(formatResults(results))
  }, [params])

  // Function to validate the inputs
  const validateInputs = (params: Record<string, number>) => {
    const { Vbb, Vcc, Rc, Re } = params

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

  // Function to format results in an string
  const formatResults = (results: CircuitCommonResults) => {
    const { Ib, Ic, Ie, Vce, Pd, Ic_sat, Vce_sat, alpha_cc, Dot_Q, Bcc_sat } = results
    return `
    Ib: ${formatElectricalUnit(Ib)}A
    Ic: ${formatElectricalUnit(Ic)}A
    Ie: ${formatElectricalUnit(Ie)}A
    Vce: ${formatElectricalUnit(Vce)}V
    Pd: ${formatElectricalUnit(Pd)}W
    ${Ic_sat ? `Ic_sat: ${formatElectricalUnit(Ic_sat)}A` : ''}
    ${Vce_sat ? `Vce_sat: ${formatElectricalUnit(Vce_sat)}V` : ''}
    ${alpha_cc ? `αcc: ${formatElectricalUnit(alpha_cc)}` : ''}
    ${Dot_Q ? `Dot Q: ${formatElectricalUnit(Dot_Q)}V` : ''}
    ${Bcc_sat ? `Bcc_sat: ${formatElectricalUnit(Bcc_sat)}` : ''}`
  }

  // Function to clear input fields
  const clearFields = useCallback(() => {
    setParams(initialParams)
    setResult(undefined)
    setPointQ(undefined)
  }, [])

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
            <ResultsView result={result} pointQ={pointQ} />
            <Button title="Calculate" variant="primary" onPress={handleCalculateCircuit} />
            <Button title="Clear" variant="tertiary" onPress={clearFields} />
          </View>
        </ScrollView>
      </View>
    </>
  )
}
