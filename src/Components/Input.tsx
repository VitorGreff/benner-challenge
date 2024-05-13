import { useState } from "react"

interface InputProps {
  text: string
  value: number
  min: number
  max: number
  sendDataToParent: (data:any)=>void
}

export default function InputButton(props: InputProps) {
  const [value, setValue] = useState<Number>()

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const value = +inputValue

    if (value >= props.min && value <= props.max) {
      setValue(value);
    props.sendDataToParent(value);
    } else {
      alert(`Insira um numero entre ${props.min} e ${props.max}`);
    }

  };

  return (
    <input className="h-11 w-[400px] bg-indigo-50 rounded-r-lg flex flex-col justify-center p-2"
      type="number"
      onChange={onNumberChange}
      placeholder={props.text}
      value={value?.toString()}
      max={props.max}
      min={props.min}
    >

    </input >
  )
}
