import { useEffect, useState } from 'react'
import InputButton from './Input'
import Label from './Label'

export default function Layout() {
  const [potencia, setPotencia] = useState(10)
  const [tempo, setTempo] = useState(0)

  const recebeTempo = (data: any) => {
    setTempo(data)
  }

  const recebePotencia = (data: any) => {
    setPotencia(data)
  }

  const calculaTempoMinutos = () => {
    let minutos = Math.floor(tempo / 60)
    let segundosRestantes = tempo % 60
    return [minutos, segundosRestantes]
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
       if (tempo === 0) {
        clearInterval(intervalId)
        return 
      }
      setTempo((tempo) => tempo - 1) 
    }, 1000)

    return () => clearInterval(intervalId)
  }, [tempo])


  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      <InputButton text='potencia' min={0} max={10} value={potencia} sendDataToParent={recebePotencia}>
      </InputButton>

      <InputButton text='tempo em segundos' min={0} max={120} value={tempo} sendDataToParent={recebeTempo}>
      </InputButton>

      <button className='bg-indigo-500 flex flex-col justify-center items-center h-10 w-[200px] rounded-md'
        onClick={() => {
          setTempo(tempo + 30)
          setPotencia(10)
        }}>
        Inicio Rapido
      </button>

      <div className='flex flex-row gap-4'>
        <Label numberValue={calculaTempoMinutos()[0].toString()} />
        <Label numberValue={calculaTempoMinutos()[1].toString()} />
      </div>
    </div>
  )
}
