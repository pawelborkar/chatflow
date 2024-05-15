import { Card, CardHeader, CardBody, Image } from '@nextui-org/react'
import { Handle, Position } from 'reactflow';
import { MessageCircleMore } from 'lucide-react'
import { INodeContentProps } from '../../interfaces';

const ChatBox = ({ data }: INodeContentProps) => {
  return (
    <>
      <Card className="max-w-80 w-48 h-16 rounded-md shadow-gray-800/15 shadow-lg">
        <CardHeader className="w-full h-3  rounded-md flex justify-between items-center bg-green-100">
          <div className="w-full flex justify-evenly items-center">
            <MessageCircleMore size={12} />
            <div className="flex items-start justify-center ">
              <p className="text-[10px] font-semibold leading-none text-black"> {data.header}</p>
            </div>
            <div className="p-1 bg-white rounded-full">
              <Image src="../../../public/whatsapp.png" className='h-3 w-3' />
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-2 text-small h-2/3 text-gray-500">
          <p>
            {data.content}
          </p>
        </CardBody>
      </Card >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  )
}

export default ChatBox
