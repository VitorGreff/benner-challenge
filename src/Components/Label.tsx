interface LabeProps{
  numberValue: string
}

export default function Label(props: LabeProps) {
  return (
    <div className="bg-gray-100 h-[100px] w-[100px] rounded flex flex-col justify-center items-center text-5xl">
        {props.numberValue}
    </div>
  )
}
