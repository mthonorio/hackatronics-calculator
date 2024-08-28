declare module 'react-native-math-view' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  interface MathViewProps extends ViewProps {
    math: string;
    color?: string;
    size?: { width: number; height: number };
    style?: any;
  }

  export default class MathView extends Component<MathViewProps> {}
}

declare module 'react-native-math-view/src/fallback'

declare module 'react-native-math-view/src/android' {
  export type MathViewProps = any
}
