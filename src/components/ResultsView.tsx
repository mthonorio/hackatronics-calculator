import { Dimensions, Text, View } from 'react-native'
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native'
import { QPoint } from '~/types'

const screenWidth = Dimensions.get('window').width

export const ResultsView = ({
  result,
  pointQ,
}: {
  result: string | undefined
  pointQ: QPoint | undefined
}) => {
  if (!result) return null

  return (
    <View className="rounded-lg bg-white p-3">
      <Text className="text-lg font-semibold">Resultados:</Text>
      <Text className="text-base font-medium">{result}</Text>

      {pointQ && (
        <View className="py-2">
          <Text className="mt-2 text-lg font-semibold">Gráfico do Ponto Q:</Text>
          <VictoryChart
            theme={VictoryTheme.material}
            width={screenWidth * 0.9}
            domain={{ x: [0, pointQ.Vcc], y: [0, pointQ.Ic_sat] }}>
            <VictoryLine
              data={[
                { x: 0, y: pointQ.Ic_sat },
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
      )}
    </View>
  )
}
