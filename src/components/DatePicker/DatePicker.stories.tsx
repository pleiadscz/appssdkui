import type { Meta } from "@storybook/react"
import { DateTime } from "luxon"
import { useState } from "react"
import { DatePicker, type DatePickerProps } from "./DatePicker"

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
  argTypes: {
    value: { control: false },
    onChange: { control: false },
    min: { control: false },
    max: { control: false },
    triggerClassName: { control: false },
    placeholder: { control: false },
  },
} satisfies Meta<typeof DatePicker>

export default meta

export const Base = (args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null)

  return <DatePicker {...args} value={selectedDate} onChange={setSelectedDate} />
}

Base.args = {
  size: "lg",
  pill: true,
  clearable: true,
}

export const Limits = (args: DatePickerProps) => {
  const today = DateTime.local()
  const minDate = today.minus({ days: 30 }).startOf("day")
  const maxDate = today.plus({ days: 30 }).endOf("day")
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(today)

  return (
    <DatePicker
      {...args}
      value={selectedDate}
      onChange={setSelectedDate}
      min={minDate}
      max={maxDate}
    />
  )
}

Limits.args = {
  size: "lg",
  pill: true,
  triggerShowIcon: true,
}

export const WithoutIcon = (args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null)

  return <DatePicker {...args} value={selectedDate} onChange={setSelectedDate} />
}

WithoutIcon.args = {
  size: "md",
  triggerShowIcon: false,
  placeholder: "Choose a date",
}

export const Disabled = (args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(DateTime.local())

  return <DatePicker {...args} value={selectedDate} onChange={setSelectedDate} />
}

Disabled.args = {
  size: "md",
  disabled: true,
}
