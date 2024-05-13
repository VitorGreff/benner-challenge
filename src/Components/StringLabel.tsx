interface StringLabelProps {
  potencia: number
  tempo: number
  stringAquecimento?: string
}


export default function StringLabel(props: StringLabelProps) {

  function buildStr(pattern: string = '.') {
    let returnString = ''

    for (let index = 0; index < props.tempo; index++) {
      returnString += pattern.repeat(props.potencia) + ' '
    }

    return returnString
  }


  return (
    <div className='flex justify-center items-center min-h-16 w-[500px] bg-indigo-50 rounded font-black'>
      {props.tempo === 0 ? 'Aquecimento Concluido' : buildStr(props.stringAquecimento)}
    </div>
  )
}
