import { useNavigate } from 'react-router-dom';


import "./Home.css"

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Start-Plan');
  };

  return (
    <div className="body flex w-full">
      <div className="left overflow-y-auto">
        <div className="container h-full px-20 pt-12 pb-0 bg-gray-100">
          <h1 className="text-left text-4xl font-semibold">Upcoming</h1>
          <div className="mainpost mb-10">
          </div>
          <h1 className="text-left text-4xl font-semibold">Others</h1>
          <div className="others">
            <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div>
          </div>
        </div>
      </div>
      <div className="right">
       <button className='bg-addNewTrip hover:bg-addNewTripHover py-4 px-3 rounded-full font-semibold shadow-md text-sl leading-6 font-sans my-20' onClick={handleClick}>
        +Add New Trip</button>
        <h1 className='text-left text-4xl font-semibold'>Calendar</h1>
      </div>
    </div>
  )
}