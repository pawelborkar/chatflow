import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import { useAtom } from 'jotai';
import ChatBox from '../ChatBox/ChatBox'
import { Sidebar } from '../../components'
import { isEditAtom, messageContentAtom, nodeAtom, nodesAtom } from '../../store';
import 'reactflow/dist/style.css';


const nodeTypes = {
  custom: ChatBox,
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { header: 'Send Message', content: "Hi there, Welcome" },
    position: { x: 250, y: 5 },
  },
];

let id = 2;
const getId = () => `${id++}`;

const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [messageContent, setMessageContent] = useAtom(messageContentAtom)
  const [isEdit, setIsEdit] = useAtom(isEditAtom)
  const [nodesArray, setNodesArray] = useAtom(nodesAtom)
  const [node, setNode] = useAtom(nodeAtom)

  const toggleEdit = () => setIsEdit(!isEdit)

  const handleNodeClick = (event, node) => {
    toggleEdit()
    setNode(node)
  };

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: "custom",
        position,
        data: { header: 'Send Message', content: messageContent },
      };

      setNodes((nds) => ([...nds, newNode]));
      //@ts-ignore next-line
      setNodesArray(nodesArray => ([...nodesArray, newNode]))

    },
    [reactFlowInstance],
  );

  return (
    <div className='flex'>
      <ReactFlowProvider >
        <div className="w-[80vw] h-screen" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodeClick={handleNodeClick}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}

            // onClick={() => setIsEdit(false)}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider >
    </div >
  );
};

export default Canvas;

