import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform, ScrollView, Text, View } from 'react-native'

import LegendsInfo from '~/components/LegendsInfo'

const legendsData = [
  {
    title: 'Transistor comum',
    data: [
      {
        title: 'Vbb',
        description: 'Tensão da fonte do lado da base do circuito',
      },
      {
        title: 'Vcc',
        description: 'Tensão da fonte de tensão do emissor-coletor do circuito',
      },
      {
        title: 'Rb',
        description: 'Resistor da base',
      },
      {
        title: 'Rc',
        description: 'Resistor do coletor',
      },
      {
        title: 'Re',
        description: 'Resistor do emissor',
      },
      {
        title: 'Gain (β)',
        description: 'Ganho do transistor',
      },
      {
        title: 'Alfa (α)',
        description: 'Ganho de corrente',
      },
      {
        title: 'Ib',
        description: 'Corrente de malha da base',
      },
      {
        title: 'Ic',
        description: 'Corrente do coletor',
      },
      {
        title: 'Ie',
        description: 'Corrente do emissor',
      },
      {
        title: 'Ve',
        description: 'Tensão do emissor',
      },
      {
        title: 'Vc',
        description: 'Tensão do coletor',
      },
      {
        title: 'Vce',
        description:
          'Tensão do coletor-emissor, também utilizado como a tensão na reta do gráfico de carga',
      },
      {
        title: 'Pd',
        description: 'Potência dissipada',
      },
      {
        title: 'Ic_sat',
        description: 'Corrente de saturação do coletor, pico do gráfico de reta da carga',
      },
      {
        title: 'Ponto Q',
        description:
          'O ponto Q é o ponto de operação do transistor. Após identificado Vb, Ve, Ie ≈ Ic e Vc, é possível identificar o ponto Q, com Vce e Ic(Q) = (Vb - Vbe) / Re. Geralmente descrito como Q = [Vce, Ic(Q)].',
      },
    ],
  },
]

export default function Modal() {
  const LegendContainer = () => {
    return (
      <>
        {legendsData.map((legend, index) => (
          <View key={legend.title} className="mb-4 p-1">
            <Text className="mb-2 text-xl font-bold">{legend.title}</Text>
            {legend.data.map((item) => (
              <LegendsInfo key={item.title} title={item.title} description={item.description} />
            ))}
          </View>
        ))}
      </>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Legendas' }} />
      <View className="flex-1 p-4">
        <ScrollView>{LegendContainer()}</ScrollView>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  )
}
