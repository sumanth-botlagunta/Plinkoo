import { useRef } from 'react'
import './App.css'
function App() {
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  return (
    <>
      <div>
        <h1 className='font-medium font-mono text-green-600 text-2xl text-center'>Hello developers !!</h1>
      </div>
      <div className='flex flex-col'>
        <div className='flex justify-end'>
          <button className='w-28 h-9 bg-black text-white font-bold my-4'>Add ball</button>
        </div>
        <canvas className='flex justify-center' ref={canvasRef} width={800} height={800}></canvas>
      </div>
    </>
  )
}

export default App
