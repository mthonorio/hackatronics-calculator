import { Stack } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, ScrollView, View } from 'react-native'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'

import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

export default function Home() {
  const [vbb, setVbb] = useState('')
  const [rb, setRb] = useState('')
  const [rc, setRc] = useState('')
  const [re, setRe] = useState('')
  const [vcc, setVcc] = useState('')
  const [gain, setGain] = useState('')
  const circuit_emitter_image = require('../../assets/images/circuit_emitter.png')

  function handleCalculateCircuit() {
    const Vbb = parseFloat(vbb)
    const Vcc = parseFloat(vcc)
    const Rb = parseFloat(rb)
    const Rc = parseFloat(rc)
    const Re = parseFloat(re)
    let Gain = parseFloat(gain)

    if (isNaN(Rb)) {
      const Ic_sat = Vcc / Rc
      const Ib = Ic_sat / Gain
      const Rb = Vbb / Ib
      Alert.alert('Rb deve ter: ', Rb.toString())
      return
    }

    const Ib = (Vbb - 0.7) / Rb
    let Ic: Float = 0

    if (gain !== '' && !isNaN(Gain)) {
      Ic = parseFloat(gain) * Ib
    }

    if (isNaN(Gain)) {
      Gain = Ic * Ib
    }

    if (Rb === 0 && Re > 0) {
      const Ve = Vbb - 0.7
      const Ie = Ve / Re
      const Ic = Ie
      const Vc = Vcc - Ic * Rc
      const Vce = Vc - Ve
      const Pd = Vce * Ic

      return Alert.alert(
        'Resultados',
        `Ib: ${Ib} A\nIc: ${Ic} A\nIe: ${Ie} A\nVce: ${Vce.toFixed(
          2
        )} V\nPd: ${Pd} W\n Ponto Q: ${Vce} V e ${Ic} A`
      )
    }

    const Ie = Ic + Ib
    const Vce = Vcc - Ic * Rc
    const Ic_sat = Vcc / Rc
    const Vce_sat = 0.2 * Vcc
    const alpha_cc = Ic / Ie
    const Pd = Vce * Ic
    const Dot_Q = Vcc - Vce
    const Bcc_sat = Ic_sat / Ib

    return Alert.alert(
      'Resultados',
      `Ib: ${Ib} A\nIc: ${Ic} A\nIe: ${Ie} A\nVce: ${Vce} V\nIc_sat: ${Ic_sat} A\nVce_sat: ${Vce_sat} V\nαcc: ${alpha_cc}\nPd: ${Pd} W\nDot Q: ${Dot_Q} V\nBcc_sat: ${Bcc_sat}`
    )
  }

  function clearFields() {
    setVbb('')
    setVcc('')
    setRb('')
    setRc('')
    setRe('')
    setGain('')
  }

  return (
    <>
      <Stack.Screen options={{ title: 'CDC - Emissor comum' }} />
      <View className="flex-1 p-4">
        <ScrollView>
          <View className="w-full p-2">
            <Image source={circuit_emitter_image} className="w-full" resizeMode="contain" />
          </View>
          <View className="gap-4 p-2">
            <Input variant="secondary">
              <Input.Field
                placeholder="Vbb"
                onChangeText={setVbb}
                value={vbb}
                keyboardType="numeric"
              />
            </Input>
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
                placeholder="Rb"
                keyboardType="numeric"
                onChangeText={setRb}
                value={rb}
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
