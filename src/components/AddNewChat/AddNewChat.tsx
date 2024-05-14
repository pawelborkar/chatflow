import { Card, Tooltip } from "@nextui-org/react"
import { MessageCirclePlus } from "lucide-react";

const AddNewChat: React.FC = () => {

  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex justify-center items-center" onDragStart={(event) => onDragStart(event, 'default')} draggable>
      <Tooltip content="Drag to add new message">
        <Card className="max-w-[340px] h-28 w-56 max-h-80 flex flex-col justify-evenly items-center border-2 border-indigo-500 rounded-md">
          <MessageCirclePlus className="text-indigo-400" size={36} />
          <p className="text-xl text-indigo-400 font-bold"> Message </p>
        </Card>
      </Tooltip>
    </div>
  );
};

export default AddNewChat
