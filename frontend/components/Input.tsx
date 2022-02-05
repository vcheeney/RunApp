import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEventHandler, FC } from 'react'

type Props = FieldHookConfig<string> & {
  icon?: JSX.Element
  label?: string
  SubmitButtonIcon?: (props: React.ComponentProps<'svg'>) => JSX.Element
}

const Input: FC<Props> = ({ icon, label, SubmitButtonIcon, ...props }) => {
  const [field, meta] = useField<string>(props)
  return (
    <div>
      {label && (
        <label
          className="text-sm font-medium tracking-wider text-gray-400 uppercase"
          htmlFor={field.name}
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center flex-grow-0 flex-shrink w-full h-10 px-3 py-2 space-x-2 leading-tight text-gray-500 bg-white border rounded-lg shadow appearance-none focus-within:ring focus-within:border-primary-300 ${
          props.disabled ? 'bg-gray-50 text-gray-300' : ''
        }`}
      >
        {icon}
        <input
          id={field.name}
          disabled={props.disabled}
          {...field}
          type={props.type}
          onChange={
            (props.onChange as ChangeEventHandler<HTMLInputElement>) ||
            field.onChange
          }
          className={`flex-grow text-black border-none outline-none h-full ${
            props.disabled ? 'bg-gray-50' : ''
          }`}
          placeholder={props.placeholder}
        />
        {SubmitButtonIcon && (
          <button type="submit" disabled={props.disabled}>
            <SubmitButtonIcon
              className={`w-5 h-5 ${props.disabled ? 'cursor-default' : ''}`}
            />
          </button>
        )}
      </div>
      {meta.touched && meta.error ? (
        <p className="text-sm font-medium tracking-wide text-red-600">
          {meta.error}
        </p>
      ) : null}
    </div>
  )
}

export default Input
