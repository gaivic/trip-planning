import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { IoIosPin } from 'react-icons/io';

import Calendar from '../component/Calendar.jsx';

import "./Home.css"
import { DateRange } from 'react-date-range';
import useNewTripModal from '../hooks/useNewTripModal.js';
import NewTripModal from '../component/Modals/NewTripModal.jsx';
import useCalendar from '../component/Calendar.jsx';


export default function Home() {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(2023, 6, 3),
      endDate: new Date(2023, 6, 5),
    },
    {
      startDate: new Date(2023, 6, 8),
      endDate: new Date(2023, 6, 9),
    },
  ]);

  // const handleClick = () => {
  //   navigate('/Start-Plan');
  // };

  const newTripModal = useNewTripModal();
  const onNewTrip = useCallback(() => {
    newTripModal.onOpen();
  }, [NewTripModal])

  return (
    <>
      <NewTripModal isOpen/>
      <div className="body flex w-full">
        <div className="left overflow-y-auto">
          <div className="container w-3/5 min-h-full px-4 pt-8 pb-0 m-auto bg-gray-50">
            <h1 className="text-left text-4xl font-bold pl-2 mb-5">Upcoming Trips</h1>
            <div className="mainpost mb-10 h-80 bg-gray-100 flex flex-col rounded-3xl mx-16">
              <p className='text-2xl font-normal text-end pr-3'>4/28 - 4/30</p>
              <div className='flex-grow overflow-hidden rounded-3xl'>
                <img src="images/travel.jpg" className='h-full w-full object-cover' />
              </div>
              <div className='h-20 flex items-center'>
                <p className='w-1/3 text-2xl font-medium text-start flex items-center'><IoIosPin />Taipei</p>
                <p className='w-1/3 text-3xl font-semibold text-center'>Trip to Bali</p>
                <div className='w-1/3 flex justify-end'><img src="images/default.png" className='round-image w-7 h-7 mr-5 border border-solid rounded-full' /></div>
              </div>

            </div>
            {/* <h1 className="text-left text-4xl font-semibold">Others</h1> */}
            <div className='others flex flex-col  min-h-[9rem]'>
              <div className='min-h-full w-full flex justify-between mb-5'>
                <div className='post bg-gray-100 rounded-2xl'>
                  <img src="images/travel.jpg" className='rounded-xl h-3/4 w-full object-cover' />
                  <div className='w-full h-1/4'>
                    <p className=' text-xl text-left'>Trip to Japan</p>
                    <div className='flex items-center justify-between'>
                      <p className=' text-gray-600'>5/3 - 5/4</p>
                      <div className='w-6 h-6 mr-3'><img src="images/default.png" className='round-image ' /></div>
                    </div>
                  </div>
                </div>
                <div className='post bg-gray-100 rounded-2xl'>
                  <img src="images/gray.png" className='rounded-xl h-3/4 w-full object-cover' />
                  <div className='w-full h-1/4'>
                    <p className=' text-xl text-left'>Trip to Japan</p>
                    <div className='flex items-center justify-between'>
                      <p className=' text-gray-600'>5/3 - 5/4</p>
                      <div className='w-6 h-6 mr-3'><img src="images/default.png" className='round-image ' /></div>
                    </div>
                  </div>
                </div>
                <div className='post bg-gray-100 rounded-2xl'>
                  <img src="images/gray.png" className='rounded-xl h-3/4 w-full object-cover' />
                  <div className='w-full h-1/4'>
                    <p className=' text-xl text-left'>Trip to Japan</p>
                    <div className='flex items-center justify-between'>
                      <p className=' text-gray-600'>5/3 - 5/4</p>
                      <div className='w-6 h-6 mr-3'><img src="images/default.png" className='round-image ' /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='min-h-full w-full flex justify-between mb-5'>
                <div className='post bg-white rounded-2xl'></div>
                <div className='post bg-white rounded-2xl'></div>
                <div className='post bg-white rounded-2xl'></div>
              </div>
            </div>
          </div>
        </div>
        <div className="right bg-gray-100">
          <button className='bg-addNewTrip hover:bg-addNewTripHover py-4 px-3 rounded-full font-semibold shadow-md text-sl leading-6 font-sans my-20' onClick={newTripModal.onOpen}>
            +Add New Trip</button>
          <h1 className='text-left text-4xl font-semibold pl-10 mb-3'>Calendar</h1>
          <div>
            <Calendar
              selectedRange={selectedRange}
            />
          </div>
        </div>
      </div>
    </>

  )
}