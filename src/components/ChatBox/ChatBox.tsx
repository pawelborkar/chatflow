import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { Handle, Position } from 'reactflow';
import { MessageCircleMore } from 'lucide-react'
import { WhatsApp } from '../../components/'
import { INodeContentProps } from '../../interfaces';

const ChatBox = ({ data }: INodeContentProps) => {
  return (
    <>
      <Card className="max-w-80 w-48 h-16 rounded-md shadow-gray-800/15 shadow-lg">
        <CardHeader className="w-full h-3  rounded-md flex justify-between items-center bg-teal-200">
          <div className="w-full flex justify-between items-center">
            <div className='w-2/3 flex justify-start items-center'>
              <MessageCircleMore size={12} />
              <div className="flex items-start justify-center pl-1 mt-1">
                <p className="text-[10px] font-bold leading-none text-black"> {data.header}</p>
              </div>
            </div>
            <div className="p-1 bg-white rounded-full">
              <WhatsApp height={10} width={10} />
            </div>
          </div>
        </CardHeader >
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
