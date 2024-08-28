import React from 'react'
import { View, Text, StyleSheet, ViewProps } from 'react-native'

interface LegendsInfoProps extends ViewProps {
  title: string
  description: string
}

const LegendsInfo: React.FC<LegendsInfoProps> = ({ title, description, ...props }) => {
  return (
    <View style={styles.container} {...props}>
      <Text style={styles.title}>{title}</Text>
      <Text className="break-words" style={styles.description}>
        {description}
      </Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#666666',
  },
})

export default LegendsInfo
