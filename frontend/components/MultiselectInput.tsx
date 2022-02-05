import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { FieldHookConfig, useField } from 'formik'
import { FC, Fragment } from 'react'

type Props = FieldHookConfig<string[]> & {
  label?: string
  preview?: boolean
  submitForm: () => void
  options: Array<{
    value: string
    label: string
  }>
}

const MultiselectInput: FC<Props> = ({
  preview = false,
  submitForm,
  options,
  ...props
}) => {
  const [field, meta, { setValue }] = useField<string[]>(props)

  const name =
    field.value.length !== options.length &&
    options
      .filter((o) => field.value.includes(o.value))
      .map((o) => o.label)
      .join(', ')

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex items-center w-full h-10 px-3 py-2 space-x-2 leading-tight text-gray-600 bg-white border rounded-lg shadow appearance-none focus-within:ring focus-within:border-primary-300 focus:outline-none md:w-auto ${
              preview ? 'bg-gray-50 cursor-default text-gray-300' : ''
            }`}
            disabled={preview}
          >
            <ChevronDownIcon className="flex-none w-5 h-5" aria-hidden="true" />
            <span className="overflow-hidden text-left w-36 whitespace-nowrap overflow-ellipsis">
              {name || props.placeholder}
            </span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 transform -translate-x-1/2 bg-white rounded-md shadow-xl left-1/2">
              <div className="py-4">
                {options.map(({ value, label }) => (
                  <div
                    key={value}
                    className="flex items-center px-2 rounded hover:bg-gray-100"
                  >
                    <input
                      id={value}
                      type="checkbox"
                      checked={field.value.includes(value)}
                      value={value}
                      className="w-5 h-5 rounded text-primary-500 focus:ring-2 hover:cursor-pointer"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setValue([...field.value, value])
                        } else {
                          setValue(field.value.filter((v) => v !== value))
                        }
                        submitForm()
                      }}
                    />
                    <label
                      className="w-full py-2 pl-2 font-medium select-none hover:cursor-pointer"
                      htmlFor={value}
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default MultiselectInput
