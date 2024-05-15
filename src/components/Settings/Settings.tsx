import { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Textarea } from '@nextui-org/react'
import { useAtom } from 'jotai'
import { ArrowLeft } from "lucide-react"
import { isEditAtom, nodeAtom, nodesAtom } from '../../store'
import { INode } from '../../interfaces'
const Settings = () => {

  const [isEdit, setIsEdit] = useAtom(isEditAtom)
  const [msg, setMsg] = useState<string>('')
  const [totalNodes, setTotalNodes] = useAtom(nodesAtom)
  const [node, setNode] = useAtom(nodeAtom)

  const getMessageContent = () => {
    const id = node?.id
    const nodeDetials = totalNodes.filter((node: INode) => node.id === id)
    return nodeDetials[0]?.data.content
  }

  //TODO: Refactor to optimise this maybe just eliminate the useEffect's use
  useEffect(() => {
    const msgContent = getMessageContent()
    setMsg(msgContent)
  }, [totalNodes])

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value
    const msgContent = node.data
    msgContent.content = message
    setNode({ ...node, msgContent })
    setTotalNodes(totalNodes => [...totalNodes, node])
  }

  const handleCloseEdit = () => {
    if (isEdit === true) {
      setIsEdit(false)
    }
  }

  return (
    <Card className="h-full max-h-80 w-full flex flex-col justify-evenly items-center border-b-black rounded-md">
      <CardHeader className='flex justify-between items-center border-2 rounded-md'>
        <ArrowLeft className="text-gray-600" size={24} onClick={handleCloseEdit} cursor='pointer' />
        <div className='flex flex-grow justify-center items-center'>
          <p className="text-xl text-gray-600 font-bold"> Message </p>
        </div>
      </CardHeader >
      <CardBody>
        <p className="text-gray-400"> Text </p>
        <Textarea
          variant="bordered"
          placeholder="Enter your message"
          value={msg}
          onChange={handleMessageChange}
          disableAnimation
          disableAutosize
          classNames={{
            base: "max-w-xs",
            input: "resize-y min-h-[120px] border-2 p-1",
          }}
        />
      </CardBody>
      <CardFooter>
        <Button color="primary" variant='flat' fullWidth className='h-12 borde-2 bg-blue-500 text-white' onClick={handleCloseEdit}> Done </Button>
      </CardFooter>
    </Card >
  )
}
export default Settings

