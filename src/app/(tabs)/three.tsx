import { Stack } from 'expo-router'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { FormulaProps, FormulaItem } from '~/components/FormulaItem'
import { ScreenContent } from '~/components/ScreenContent'

const data: FormulaProps[] = [
  {
    id: Math.random().toString(),
    title: 'Corrente no transistor',
    formula: 'I_e = I_c + I_b',
  },
  {
    id: Math.random().toString(),
    title: 'Ganho de corrente',
    formula: 'β_cc = I_c * I_b <=> I_c = β_cc * I_b <=> I_b = I_c / β_cc',
  },
  {
    id: Math.random().toString(),
    title: 'Circuito da base EC - Tensão',
    formula: 'V_bb = R_b * I_b + V_be',
  },
  {
    id: Math.random().toString(),
    title: 'Circuito da base EC - Corrente',
    formula: 'I_b = (V_bb - V_be) / R_b',
  },
  {
    id: Math.random().toString(),
    title: 'Circuito do coletor EC - Tensão',
    formula: 'V_cc = R_c * I_c + V_ce',
  },
  {
    id: Math.random().toString(),
    title: 'Circuito do coletor EC - Corrente',
    formula: 'I_c = (V_cc - V_ce) / R_c',
  },
  {
    id: Math.random().toString(),
    title: 'Conexão emissor comum',
    formula: 'V_ce > 1V e V_be = 0,7V',
  },
  {
    id: Math.random().toString(),
    title: 'Curvas do coletor',
    formula: 'I_c = β_cc * I_b',
  },
  {
    id: Math.random().toString(),
    title: 'Tensão do coletor e emissor',
    formula: 'V_ce = V_cc - I_c * R_c',
  },
  {
    id: Math.random().toString(),
    title: 'Potência dissipada no transistor',
    formula: 'P_d = V_ce * I_c',
  },
  {
    id: Math.random().toString(),
    title: 'Alfa CC',
    formula: 'α_cc = I_c / I_e',
  },
  {
    id: Math.random().toString(),
    title: 'Relação entre o Alfa CC e Beta CC',
    formula: 'β_cc = α_cc / 1 - α_cc',
  },
  {
    id: Math.random().toString(),
    title: 'Ponto de saturação - Corrente',
    formula: 'Ic_sat = Vcc / Rc',
  },
]

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Formulas' }} />
      <View className="flex-1 p-6">
        {data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }) => <FormulaItem data={item} />}
            contentContainerClassName="gap-4"
          />
        ) : (
          <Text className="font-regular mb-6 mt-2 text-base text-zinc-400">
            Nenhuma formula adicionada.
          </Text>
        )}
      </View>
    </>
  )
}
