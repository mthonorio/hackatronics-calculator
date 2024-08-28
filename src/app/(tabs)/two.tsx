import React, { useState, useCallback, useMemo } from 'react'
import { Alert, Dimensions, Image, ScrollView, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { formatElectricalUnit } from '~/utils/number'

const screenWidth = Dimensions.get('window').width
const pdt_circuit_image = require('../../assets/images/pdt-polarized-current-divider.png')

type QPoint = {
  Vcc: number
  Ic_sat: number
  Vce: number
  Ie: number
}

type CircuitParams = {
  vcc: string
  rc: string
  re: string
  r1: string
  r2: string
  gain: string
}

type CalculationResults = {
  Vout: number
  I: number
  I_min: number
  Vb: number
  Ve: number
  Ie: number
  Vc: number
  Vce: number
  Pd: number
  Ib_test: number
  Ic_sat: number
  Q: string
}

const parseCircuitParams = (params: CircuitParams) => ({
  Vcc: parseFloat(params.vcc),
  Rc: parseFloat(params.rc),
  Re: parseFloat(params.re),
  R1: parseFloat(params.r1),
  R2: parseFloat(params.r2),
  Gain: parseFloat(params.gain),
})

const areParamsValid = (params: Record<string, number>) =>
  Object.values(params).every((value) => !isNaN(value))

const calculateCircuit = ({ Vcc, Rc, Re, R1, R2, Gain }: ReturnType<typeof parseCircuitParams>) => {
  const Vout = (R2 / (R1 + R2)) * Vcc
  const I = Vout / (R1 + R2)
  const I_min = I / 20
  const Vb = (Vcc / (R1 + R2)) * R2
  const Ve = Vb - 0.7
  const Ie = Ve / Re
  const Vc = Vcc - Ie * Rc
  const Vce = Vc - Ve
  const Pd = Vce * Ie
  const Ib_test = Ie / Gain
  const Ic_sat = Vcc / (Rc + Re)
  const Q = `Ponto Q: ${formatElectricalUnit(Vce)}V e ${formatElectricalUnit(Ie)}A`

  return {
    Vout,
    I,
    I_min,
    Vb,
    Ve,
    Ie,
    Vc,
    Vce,
    Pd,
    Ib_test,
    Ic_sat,
    Q,
  }
}

const ResultsView = ({
  result,
  pointQ,
}: {
  result: string | undefined
  pointQ: QPoint | undefined
}) => {
  if (!result || !pointQ) return null

  return (
    <View className="rounded-lg bg-white p-3">
      <Text className="text-lg font-semibold">Resultados:</Text>
      <Text className="text-base font-medium">{result}</Text>

      <View className="py-2">
        <Text className="mt-2 text-lg font-semibold">Gráfico do Ponto Q:</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          width={screenWidth * 0.9}
          domain={{ x: [0, pointQ.Vcc], y: [0, pointQ.Ic_sat] }}>
          <VictoryLine
            data={[
              { x: 0, y: pointQ.Ie },
              { x: pointQ.Vce, y: 0 },
            ]}
          />
          <VictoryAxis label={'V'} />
          <VictoryAxis dependentAxis label={'A'} />
          <VictoryScatter
            data={[{ x: pointQ.Vce, y: pointQ.Ie }]}
            size={6}
            labels={({ datum }) => `Q`}
            style={{
              data: { fill: 'red' },
            }}
          />
        </VictoryChart>
      </View>
    </View>
  )
}

const formatResults = (results: CalculationResults): string => {
  const { Vout, I, I_min, Vb, Ve, Ie, Vc, Vce, Pd, Ib_test, Ic_sat, Q } = results

  return `
    Vout: ${formatElectricalUnit(Vout)}V
    I: ${formatElectricalUnit(I)}A
    I_min: ${formatElectricalUnit(I_min)}A
    Vb: ${formatElectricalUnit(Vb)}V
    Ve: ${formatElectricalUnit(Ve)}V
    Ie: ${formatElectricalUnit(Ie)}A
    Vc: ${formatElectricalUnit(Vc)}V
    Vce: ${formatElectricalUnit(Vce)}V
    Pd: ${formatElectricalUnit(Pd)}W
    Ib_test: ${formatElectricalUnit(Ib_test)}A
    Ic_sat: ${formatElectricalUnit(Ic_sat)}A
    ${Q}`
}

const initialParams = {
  vcc: '',
  rc: '',
  re: '',
  r1: '',
  r2: '',
  gain: '',
}

export default function Home() {
  const [params, setParams] = useState<CircuitParams>(initialParams)
  const [result, setResult] = useState<string>()
  const [pointQ, setPointQ] = useState<QPoint>()

  // Function to handle the change of text input fields
  const handleInputChange = (name: keyof CircuitParams, value: string) => {
    setParams((prevParams) => ({ ...prevParams, [name]: value }))
  }

  const handleCalculateCircuit = useCallback(() => {
    const parsedParams = parseCircuitParams(params)

    if (!areParamsValid(parsedParams)) {
      return Alert.alert('Erro', 'Preencha todos os campos')
    }

    const results = calculateCircuit(parsedParams)
    setPointQ({ Vcc: parsedParams.Vcc, Ic_sat: results.Ic_sat, Vce: results.Vce, Ie: results.Ie })
    setResult(formatResults(results))
  }, [params])

  const clearFields = useCallback(() => {
    setParams(initialParams)
    setResult(undefined)
    setPointQ(undefined)
  }, [])

  return (
    <>
      <Stack.Screen options={{ title: 'PDT - Polarização por Divisor de Tensão' }} />
      <View className="flex-1 p-4">
        <ScrollView>
          <View className="w-full p-2">
            <Image source={pdt_circuit_image} className="w-full" resizeMode="contain" />
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
