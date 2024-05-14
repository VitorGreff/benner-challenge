import { useEffect, useState } from 'react'
import InputButton from './Input'
import Label from './Label'
import StringLabel from './StringLabel'

export default function Layout() {
  // just used as label
  const [potenciaAux, setPotenciaAux] = useState(10)
  const [tempoAux, setTempoAux] = useState(0)

  // real values
  const [potencia, setPotencia] = useState(10)
  const [tempo, setTempo] = useState(0)

  const [pausado, setPausado] = useState(false)

  const recebeTempo = (data: any) => {
    setTempoAux(data)
  }

  const recebePotencia = (data: any) => {
    setPotenciaAux(data)
  }

  const calculaTempoMinutos = () => {
    let minutos = Math.floor(tempo / 60)
    let segundosRestantes = tempo % 60
    return [minutos, segundosRestantes]
  }

  useEffect(() => {
    if (pausado) return;

    const intervalId = setInterval(() => {
      setTempo((tempo) => {
        if (tempo <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return tempo - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [tempo, pausado]);

  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      <InputButton text='potencia' min={0} max={10} value={potenciaAux} sendDataToParent={recebePotencia}>
      </InputButton>

      <InputButton text='tempo em segundos' min={0} max={120} value={tempoAux} sendDataToParent={recebeTempo}>
      </InputButton>

      <div className='flex flex-row gap-4'>
        <button className='bg-indigo-500 flex flex-col justify-center items-center h-10 w-[200px] rounded-md font-black'
          onClick={() => {
            if (pausado) {
              setPausado(false)
            }
            else {
              setTempo(tempoAux)
              setPotencia(potenciaAux)
              setPausado(false)
            }
          }}>
          Iniciar
        </button>

        <button className='bg-indigo-500 flex flex-col justify-center items-center h-10 w-[200px] rounded-md font-black'
          onClick={() => {
            setTempo((tempo) => Math.min(tempo + 30, 120))
            setPotencia(10)
            setPausado(false);
          }}>
          Inicio Rapido
        </button>
      </div>

      <button className='bg-red-600 flex flex-col justify-center items-center h-10 w-[200px] rounded-md text-lg font-black'
        onClick={() => {
          if (pausado) {
            setTempo(0)
            setPotencia(10)
          }
          else {
            setPausado(true)
          }
        }}>
        Pausar/Cancelar
      </button>

      <div className='flex flex-row gap-4 '>
        <Label numberValue={calculaTempoMinutos()[0].toString()} />
        <Label numberValue={calculaTempoMinutos()[1].toString()} />
      </div>

      <StringLabel potencia={potencia} tempo={tempo} stringAquecimento='.'>
      </StringLabel>
    </div>
  )
}
