import "./Friends.css"
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";

export default function Friends() {
    return (
        <div className="body flex w-full">
            <div className="fleft overflow-y-auto ">
                <div className="post rounded-xl mx-auto p-4 border border-gray">
                    <p className='text-2xl text-left font-semibold mb-2 ml-1'>Summer Trip to Thailand</p>
                    <img src="images/travel.jpg" className='rounded-xl h-5/6 w-full object-cover' />
                    <div className='w-full h-1/4'>
                        <div className='flex items-center justify-between'>
                            <div className='w-18 h-6 my-3 flex'>
                                <img src="images/default.png" className='round-image mx-1' />
                                <p className='text-gray-600'>Michael Ashton</p>
                            </div>
                            <div className='flex'>
                                <BsBookmark className='m-1' />
                                <BsHeart className='m-1' />
                                <p className='text-gray-600 mr-2'>56</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post rounded-xl my-10 mx-auto p-4 border border-gray">
                    <p className='text-2xl text-left font-semibold mb-2 ml-1'>Winter Trip to Cambodia</p>
                    <img src="images/travel.jpg" className='rounded-xl h-5/6 w-full object-cover' />
                    <div className='w-full h-1/4'>
                        <div className='flex items-center justify-between'>
                            <div className='w-18 h-6 my-3 flex'>
                                <img src="images/default.png" className='round-image mx-1' />
                                <p className='text-gray-600'>Anna Elisabeth</p>
                            </div>
                            <div className='flex'>
                                <BsBookmark className='m-1' />
                                <BsHeart className='m-1' />
                                <p className='text-gray-600 mr-2'>56</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post rounded-xl my-10 mx-auto p-4 border border-gray">
                    <p className='text-2xl text-left font-semibold mb-2 ml-1'>First Time Abroad</p>
                    <img src="images/travel.jpg" className='rounded-xl h-5/6 w-full object-cover' />
                    <div className='w-full h-1/4'>
                        <div className='flex items-center justify-between'>
                            <div className='w-18 h-6 my-3 flex'>
                                <img src="images/default.png" className='round-image mx-1' />
                                <p className='text-gray-600'>Pikachu</p>
                            </div>
                            <div className='flex'>
                                <BsBookmark className='m-1' />
                                <BsHeart className='m-1' />
                                <p className='text-gray-600 mr-2'>56</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fright overflow-y-auto ">
                <div className="rounded-xl mx-auto px-10 py-5">
                    <p className='text-2xl text-left mt-2 mb-6 ml-1 font-semibold'>Friends</p>
                    <div className="search rounded-2xl border border-gray-400">
                        <p className='text-xl text-left ml-5'>Search Friend</p>
                    </div>
                    <div className='add w-70 h-20 mt-4 mx-auto flex border border-gray-400'>
                        <GrAddCircle/>
                        <p className='text-gray-600 text-xl mt-4'>Add New Friends</p>
                    </div>
                    <div className='friend w-70 h-20 mx-auto flex hover:border hover:border-cyan-200'>
                        <img src="images/default.png" className='round-image ml-5 mr-10' />
                        <p className='text-gray-600 text-xl mt-2'>Joanna Christina</p>
                    </div>
                    <div className='friend w-70 h-20 mx-auto flex hover:border hover:border-cyan-200'>
                        <img src="images/default.png" className='round-image ml-5 mr-10' />
                        <p className='text-gray-600 text-xl mt-2'>Brothers Osborne</p>
                    </div>
                    <div className='friend w-70 h-20 mx-auto flex hover:border hover:border-cyan-200'>
                        <img src="images/default.png" className='round-image ml-5 mr-10' />
                        <p className='text-gray-600 text-xl mt-2'>Michael Ashton</p>
                    </div>
                    <div className='friend w-70 h-20 mx-auto flex hover:border hover:border-cyan-200'>
                        <img src="images/default.png" className='round-image ml-5 mr-10' />
                        <p className='text-gray-600 text-xl mt-2'>Chris Stapelton</p>
                    </div>
                    <div className='friend w-70 h-20 mx-auto flex hover:border hover:border-cyan-200'>
                        <img src="images/default.png" className='round-image ml-5 mr-10' />
                        <p className='text-gray-600 text-xl mt-2'>Malik Beasley</p>
                    </div>
                    <div className='friend w-70 h-20 mx-auto flex hover:border hover:border-cyan-200'>
                        <img src="images/default.png" className='round-image ml-5 mr-10' />
                        <p className='text-gray-600 text-xl mt-2'>Pikachu</p>
                    </div>
                    <div className='friend w-70 h-20 mx-auto flex hover:border hover:border-cyan-200'>
                        <img src="images/default.png" className='round-image ml-5 mr-10' />
                        <p className='text-gray-600 text-xl mt-2'>Claire Kingston</p>
                    </div>
                </div>
            </div>
        </div>
    )
}