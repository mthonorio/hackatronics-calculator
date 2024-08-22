import { Stack } from 'expo-router'
import { ScrollView, SectionList, Text, View } from 'react-native'
import uuid from 'react-native-uuid'

import { FormulaProps, FormulaItem } from '~/components/FormulaItem'
import LegendsInfo from '~/components/LegendsInfo'

type DataProps = {
  id: string
  title: string
  data: FormulaProps[]
  image?: string
}

const data: DataProps[] = [
  {
    id: `${uuid.v4()}`,
    title: 'Emissor Comum',
    data: [
      {
        id: `${uuid.v4()}`,
        title: 'Corrente no transistor',
        formula: 'I_e = I_c + I_b',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Ganho de corrente',
        formula: 'β_cc = I_c * I_b <=> I_c = β_cc * I_b <=> I_b = I_c / β_cc',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Circuito da base EC - Tensão',
        formula: 'V_bb = R_b * I_b + V_be',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Circuito da base EC - Corrente',
        formula: 'I_b = (V_bb - V_be) / R_b',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Circuito do coletor EC - Tensão',
        formula: 'V_cc = R_c * I_c + V_ce',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Circuito do coletor EC - Corrente',
        formula: 'I_c = (V_cc - V_ce) / R_c',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Conexão emissor comum',
        formula: 'V_ce > 1V e V_be = 0,7V',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Curvas do coletor',
        formula: 'I_c = β_cc * I_b',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Tensão do coletor e emissor',
        formula: 'V_ce = V_cc - I_c * R_c',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Potência dissipada no transistor',
        formula: 'P_d = V_ce * I_c',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Alfa CC',
        formula: 'α_cc = I_c / I_e',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Relação entre o Alfa CC e Beta CC',
        formula: 'β_cc = α_cc / 1 - α_cc',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Ponto de saturação - Corrente',
        formula: 'Ic_sat = Vcc / Rc',
      },
    ],
  },
  {
    id: `${uuid.v4()}`,
    title: 'Polarizado por Divisor de Tensão',
    data: [
      {
        id: `${uuid.v4()}`,
        title: 'Tensão de saída',
        formula: 'V_out = (R2 / (R1 + R2)) * V_cc',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Corrente total na base',
        formula: 'I = (V_cc) / (R1 + R2)',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Corrente na base 20x menor',
        formula: 'I_b = I / 20',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Tensão de base <=> Corrente de base 20x menor',
        formula: 'V_b = I * R2',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Tensão no emissor',
        formula: 'V_e = V_2 - V_be ou V_e = V_b - V_be',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Corrente no emissor',
        formula: 'I_e = V_e / R_e',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Tensão no coletor',
        formula: 'V_c = V_cc - I_e * R_c',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Tensão coletor emissor',
        formula: 'V_ce = V_c - V_e',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Teste de corrente de base p/ 20x menor',
        formula: 'I_b = I_e / β_cc',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Corrente no emissor-coletor saturado',
        formula: 'Ic_sat = Vcc / (Rc + Re)',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Ponto Q',
        formula: 'Vce e (Ie = Ic)',
      },
    ],
  },
]

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Formulas' }} />
      <View className="flex-1 p-6">
        <ScrollView>
          {data.length > 0 ? (
            data.map((section) => (
              <View key={section.title}>
                <Text className="mb-2 text-xl font-bold">{section.title}</Text>
                {section.data.map((item) => (
                  <LegendsInfo key={item.title} title={item.title} description={item.formula} />
                ))}
              </View>
            ))
          ) : (
            <Text className="font-regular mb-6 mt-2 text-base text-zinc-500">
              Nenhuma formula adicionada.
            </Text>
          )}
        </ScrollView>
      </View>
    </>
  )
}
