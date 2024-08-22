import { Link, Tabs } from 'expo-router'

import { HeaderButton } from '../../components/HeaderButton'
import { TabBarIcon } from '../../components/TabBarIcon'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'CDC',
          tabBarIcon: ({ color }) => <TabBarIcon name="calculator" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'PDT',
          tabBarIcon: ({ color }) => <TabBarIcon name="calculator" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Fórmulas',
          tabBarIcon: ({ color }) => <TabBarIcon name="superscript" color={color} />,
        }}
      />
    </Tabs>
  )
}
