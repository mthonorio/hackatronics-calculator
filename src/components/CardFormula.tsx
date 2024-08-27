import React from 'react'
import { View, Text, StyleSheet, ViewProps } from 'react-native'
import MathViewFallback from 'react-native-math-view/src/fallback'

interface CardFormulaProps extends ViewProps {
  title: string
  formula: string
}

const CardFormula: React.FC<CardFormulaProps> = ({ title, formula, ...props }) => {
  return (
    <View style={styles.container} {...props}>
      <Text style={styles.title}>{title}</Text>
      <MathViewFallback style={styles.formula} math={formula} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formula: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#484848',
  },
})

export default CardFormula
