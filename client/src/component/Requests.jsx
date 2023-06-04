import { useState } from 'react'
import './Requests.css'

export default function Requests() {
  const [empty, setEmpty] = useState(true);

  return(
    <div className='relative rounded-xl w-full h-full bg-blue-gray-50  z-10'>
      <div className='sticky left-0 right-0 h-10 top-0 flex justify-center items-center rounded-xl bg-blue-gray-50 font-medium text-xl'>TRIP INVITATIONS</div>
      <div className='requests overflow-y-auto' style={{ maxHeight: 'calc(100% - 2.5rem)' }}>
        <div className='w-10/12 h-40 bg-gray-50 mx-auto my-2 rounded-xl'>
        </div>
        <div className='w-10/12 h-40 bg-gray-50 mx-auto my-2 rounded-xl'>
        </div>
        <div className='w-10/12 h-40 bg-gray-50 mx-auto my-2 rounded-xl'>
        </div>
        {empty && <Defaultwords/>}
      </div>
    </div>
  )
}

const Defaultwords = () => {
  return(
    <p className=' text-center text-gray-600'>You don't have any requests</p>
  )
}