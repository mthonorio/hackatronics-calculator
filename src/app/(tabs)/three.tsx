import { Stack } from 'expo-router'
import { ScrollView, SectionList, Text, View } from 'react-native'
import uuid from 'react-native-uuid'
import CardFormula from '~/components/CardFormula'

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
        formula:
          '\\beta_{cc} = \\frac{I_c}{I_b} \\iff I_c = \\beta_{cc} \\cdot I_b \\iff I_b = \\frac{I_c}{\\beta_{cc}}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Circuito da base EC - Tensão',
        formula: 'V_{bb} = R_b \\cdot I_b + V_{be}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Circuito da base EC - Corrente',
        formula: 'I_b = \\frac{V_{bb} - V_{be}}{R_b}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Circuito do coletor EC - Tensão',
        formula: 'V_{cc} = R_c \\cdot I_c + V_{ce}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Circuito do coletor EC - Corrente',
        formula: 'I_c = \\frac{V_{cc} - V_{ce}}{R_c}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Conexão emissor comum',
        formula: 'V_{ce} > 1\\text{V} \\text{ e } V_{be} = 0,7\\text{V}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Curvas do coletor',
        formula: 'I_c = \\beta_{cc} \\cdot I_b',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Tensão do coletor e emissor',
        formula: 'V_{ce} = V_{cc} - I_c \\cdot R_c',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Potência dissipada no transistor',
        formula: 'P_d = V_{ce} \\cdot I_c',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Alfa CC',
        formula: '\\alpha_{cc} = \\frac{I_c}{I_e}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Relação entre o Alfa CC e Beta CC',
        formula: '\\beta_{cc} = \\frac{\\alpha_{cc}}{1 - \\alpha_{cc}}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Ponto de saturação - Corrente',
        formula: 'I_{c_{sat}} = \\frac{V_{cc}}{R_c}',
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
        formula: 'V_{out} = \\frac{R_2}{R_1 + R_2} \\cdot V_{cc}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Corrente total na base',
        formula: 'I = \\frac{V_{cc}}{R_1 + R_2}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Corrente na base 20x menor',
        formula: 'I_b = \\frac{I}{20}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Tensão de base <=> Corrente de base 20x menor',
        formula: 'V_b = I \\cdot R_2',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Tensão no emissor',
        formula: 'V_e = V_2 - V_{be} \\text{ ou } V_e = V_b - V_{be}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Corrente no emissor',
        formula: 'I_e = \\frac{V_e}{R_e}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Tensão no coletor',
        formula: 'V_c = V_{cc} - I_e \\cdot R_c',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Tensão coletor emissor',
        formula: 'V_{ce} = V_c - V_e',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Teste de corrente de base p/ 20x menor',
        formula: 'I_b = \\frac{I_e}{\\beta_{cc}}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Corrente no emissor-coletor saturado',
        formula: 'I_{c_{sat}} = \\frac{V_{cc}}{R_c + R_e}',
      },
      {
        id: `${uuid.v4()}`,
        title: 'Ponto Q',
        formula: 'V_{ce} \\text{ e } (I_e = I_c)',
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
                  <CardFormula key={item.title} title={item.title} formula={item.formula} />
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
