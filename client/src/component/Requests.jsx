import { useEffect, useState } from 'react'
import './Requests.css'
import { RequestPost } from './RequestPost';

export default function Requests({ userRequest, User }) {
  const [empty, setEmpty] = useState(true);
  useEffect(() => {
    console.log("request");
    console.log(userRequest)
  }, []);
  // const [requests, setRequests] = useState([]);

  const requests = [
    {
      _id: "648e7181d87569e4f6de6863",
      creatorId: 'victor',
      postTitle: 'Trip to Angola',
      picturePath: 'https://images.unsplash.com/photo-1506356605750-cba1163d24ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTY0NjV8MHwxfHNlYXJjaHw2fHxBbmdvbGF8ZW58MHx8fHwxNjg3MDA5OTUyfDA&ixlib=rb-4.0.3&q=80&w=1080',     
      location: 'Angola',
      days: '1',
      schedule: [ [Array], [Array], [Array], [Array], [Array] ],
      likes: [],
      members: [],
      dates: [ '2023/06/18', '2023/06/18' ],
      published: true,
    },
    {
      _id: "648e8578f03292e559e232e4",
      creatorId: 'victor',
      postTitle: 'Trip to Angola',
      picturePath: 'https://images.unsplash.com/photo-1520709087497-0749666fe1d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTY0NjV8MHwxfHNlYXJjaHw0fHxBbmdvbGF8ZW58MHx8fHwxNjg3MDA5OTUyfDA&ixlib=rb-4.0.3&q=80&w=1080',     
      location: 'Angola',
      days: '2',
      schedule: [ [Array], [Array], [Array], [Array], [Array] ],
      likes: [],
      members: [],
      dates: [ '2023/06/21', '2023/06/22' ],
      published: true,
    },
    {
      _id: "648f3441556cfeaf0728d34f",
      creatorId: 'victor',
      postTitle: 'Trip to Aruba',
      picturePath: 'https://images.unsplash.com/photo-1625869581767-c36368b25fd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTY0NjV8MHwxfHNlYXJjaHwzfHxBcnViYXxlbnwwfHx8fDE2ODcxMDY2MTl8MA&ixlib=rb-4.0.3&q=80&w=1080',      
      location: 'Aruba',
      days: '1',
      schedule: [ [] ],
      likes: [ 'victor' ],
      members: [],
      dates: [ '2023/06/19', '2023/06/19' ],
      published: true,
    },
    {
      _id: "648f436699cc9bb0239fa9d0",
      creatorId: '22222222222',
      postTitle: 'Trip to Afghanistan',
      picturePath: 'https://images.unsplash.com/photo-1590531970580-046a37dfbb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTY0NjV8MHwxfHNlYXJjaHw5fHxBZmdoYW5pc3RhbnxlbnwwfHx8fDE2ODcxMTA0OTR8MA&ixlib=rb-4.0.3&q=80&w=1080',
      location: 'Afghanistan',
      days: '2',
      schedule: [ [], [] ],
      likes: [],
      members: [],
      dates: [ '2023/06/20', '2023/06/21' ],
      published: true,
    }
  ]

  const requestList = userRequest.map((request) => {
    return <RequestPost post={request} User={User}/>;
  })

  return(
    <div className='relative rounded-xl w-full h-full bg-blue-gray-50  z-10'>
      <div className='sticky left-0 right-0 h-10 top-0 flex justify-center items-center rounded-xl bg-blue-gray-50 font-medium text-xl'>TRIP INVITATIONS</div>
      <div className='requests overflow-y-auto' style={{ maxHeight: 'calc(100% - 2.5rem)' }}>
        {requestList}
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