import { Stack } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, ScrollView, View } from 'react-native'

import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

export default function Home() {
  const [vcc, setVcc] = useState('')
  const [rc, setRc] = useState('')
  const [re, setRe] = useState('')
  const [r1, setR1] = useState('')
  const [r2, setR2] = useState('')
  const [gain, setGain] = useState('')
  const pdt_circuit_image = require('../../assets/images/pdt-polarized-current-divider.png')

  function handleCalculateCircuit() {
    const Vcc = parseFloat(vcc)
    const Rc = parseFloat(rc)
    const Re = parseFloat(re)
    const R1 = parseFloat(r1)
    const R2 = parseFloat(r2)
    const Gain = parseFloat(gain)

    if (isNaN(Vcc) || isNaN(Rc) || isNaN(Re) || isNaN(R1) || isNaN(R2)) {
      return Alert.alert('Erro', 'Preencha todos os campos')
    }

    const Vout = (R2 / (R1 + R2)) * Vcc
    const I = Vout / (R1 + R2)
    const I_min = I / 20
    const Vb = I * R2
    const Ve = Vb - 0.7
    const Ie = Ve / Re
    const Vc = Vcc - Ie * Rc
    const Vce = Vc - Ve
    const Pd = Vce * Ie
    const Ib_test = Ie / Gain
    const Ic_sat = Vcc / (Rc + Re)
    const Q = `Ponto Q: ${Vce} V e ${Ie} A`

    return Alert.alert(
      'Resultados',
      `Vout: ${Vout} V\nI: ${I} A\nI_min: ${I_min} A\nVb: ${Vb} V\nVe: ${Ve} V\nIe: ${Ie} A\nVc: ${Vc} V\nVce: ${Vce} V\nPd: ${Pd} W\nIb_test: ${Ib_test} A\nIc_sat: ${Ic_sat} A\n${Q}`
    )
  }

  function clearFields() {
    setVcc('')
    setRc('')
    setRe('')
    setR1('')
    setR2('')
    setGain('')
  }

  return (
    <>
      <Stack.Screen options={{ title: 'PDT - Polarização por Divisor de Tensão' }} />
      <View className="flex-1 p-4">
        <ScrollView>
          <View className="w-full p-2">
            <Image source={pdt_circuit_image} className="w-full" resizeMode="contain" />
          </View>
          <View className="gap-4 p-2">
            <Input variant="secondary">
              <Input.Field
                placeholder="Vcc"
                keyboardType="numeric"
                onChangeText={setVcc}
                value={vcc}
              />
            </Input>
            <Input variant="secondary">
              <Input.Field
                placeholder="Rc"
                keyboardType="numeric"
                onChangeText={setRc}
                value={rc}
              />
            </Input>
            <Input variant="secondary">
              <Input.Field
                placeholder="Re"
                keyboardType="numeric"
                onChangeText={setRe}
                value={re}
              />
            </Input>
            <Input variant="secondary">
              <Input.Field
                placeholder="R1"
                keyboardType="numeric"
                onChangeText={setR1}
                value={r1}
              />
            </Input>
            <Input variant="secondary">
              <Input.Field
                placeholder="R2"
                keyboardType="numeric"
                onChangeText={setR2}
                value={r2}
              />
            </Input>
            <Input variant="secondary">
              <Input.Field
                placeholder="Ganho (β): opcional"
                keyboardType="numeric"
                onChangeText={setGain}
                value={gain}
              />
            </Input>
            <Button title="Calculate" variant="primary" onPress={handleCalculateCircuit} />
            <Button title="Clear" variant="tertiary" onPress={clearFields} />
          </View>
        </ScrollView>
      </View>
    </>
  )
}
