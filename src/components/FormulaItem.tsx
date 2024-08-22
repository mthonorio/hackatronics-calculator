import { Image, Text, View } from 'react-native'

export type FormulaProps = {
  id: string
  title: string
  formula: string
  image?: string
}

type Formula = { data: FormulaProps }

export const FormulaItem = ({ data }: Formula) => {
  return (
    <View className="m-4 flex-1 rounded-lg bg-white p-4 shadow-md">
      <Text className="text-lg font-bold">{data.title}</Text>
      <Text className="text-base">{data.formula}</Text>
      {data.image && <Image src={data.image} />}
    </View>
  )
}
