import { Dimensions, Text, View } from 'react-native'
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native'
import { QPoint } from '~/types'
import { formatElectricalUnit } from '~/utils/format'

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
          <Text className="mt-2 text-lg font-semibold">
            Gráfico de Reta de Carga:
          </Text>
          <VictoryChart
            theme={VictoryTheme.material}
            width={screenWidth * 0.9}
            domain={{ x: [0, pointQ.Vcc], y: [0, pointQ.Ic_sat] }}>
            <VictoryLabel
              x={30}
              y={30}
              text={`${formatElectricalUnit(pointQ.Ic_sat)}A`}
              style={{ fontSize: 12 }}
            />
            <VictoryLabel
              x={screenWidth * 0.9 - 50}
              y={screenWidth * 0.9 - 20}
              text={`${pointQ.Vcc}V`}
              style={{ fontSize: 12 }}
            />
            <VictoryLine
              data={[
                { x: 0, y: pointQ.Ic_sat },
                { x: pointQ.Vcc, y: 0 },
              ]}
            />
            <VictoryAxis
              label={'V'}
              style={{
                tickLabels: { fontSize: 10, padding: 5 },
              }}
            />
            <VictoryAxis
              dependentAxis
              label={'A'}
              style={{
                tickLabels: { fontSize: 10, padding: 5 },
              }}
            />
            <VictoryScatter
              data={[{ x: pointQ.Vce, y: pointQ.Ie }]}
              size={6}
              labels={({ datum }) =>
                `Q(${formatElectricalUnit(datum.x)}V, ${formatElectricalUnit(datum.y)}A)`
              }
              labelComponent={
                <VictoryLabel
                  dx={40}
                  dy={-10}
                  style={{ fontSize: 10, fontWeight: '500' }}
                />
              }
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
