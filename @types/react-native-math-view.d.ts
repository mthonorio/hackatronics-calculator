declare module 'react-native-math-view' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  interface MathViewProps extends ViewProps {
    math: string;
    color?: string;
    style?: any;
  }

  export default class MathView extends Component<MathViewProps> {}
}