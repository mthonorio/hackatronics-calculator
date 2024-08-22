import clsx from 'clsx'
import { forwardRef } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Variants = 'primary' | 'secondary' | 'tertiary'

type ButtonProps = {
  title: string
  variant?: Variants
} & TouchableOpacityProps

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ title, variant = 'primary', className, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={clsx(
          'flex-row items-center justify-center gap-2 rounded-2xl p-4',
          {
            'bg-blue-600 shadow-md': variant === 'primary',
            'bg-zinc-800 shadow-md': variant === 'secondary',
            'bg-transparent': variant === 'tertiary',
          },
          className
        )}>
        <Text
          className={clsx('text-center text-lg font-semibold', {
            'text-white': variant === 'primary' || variant === 'secondary',
            'text-zinc-800': variant === 'tertiary',
          })}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
)

const styles = {
  button: '',
  buttonText: 'text-white ',
}
