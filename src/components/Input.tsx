import clsx from 'clsx'
import { ReactNode } from 'react'
import { TextInput, View, TextInputProps, ViewProps, Platform } from 'react-native'

import { colors } from '~/styles/colors'

type Variants = 'primary' | 'secondary' | 'tertiary'

type InputProps = ViewProps & {
  children: ReactNode
  variant?: Variants
}

function Input({ children, variant = 'primary', className, ...rest }: InputProps) {
  return (
    <View
      className={clsx(
        'h-16 max-h-16 min-h-16 flex-row items-center gap-2',
        {
          'h-14 rounded-lg border border-zinc-400 px-4': variant !== 'primary',
          'bg-white': variant === 'secondary',
          'bg-zinc-300': variant === 'tertiary',
        },
        className
      )}
      {...rest}>
      {children}
    </View>
  )
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="font-regular flex-1 text-lg text-zinc-900"
      placeholderTextColor={colors.zinc[500]}
      cursorColor={colors.zinc[500]}
      selectionColor={Platform.OS === 'ios' ? colors.zinc[900] : undefined}
      {...rest}
    />
  )
}

Input.Field = Field

export { Input }
