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
import { isEditAtom, nodeAtom, nodesAtom } from '../../store';
import 'reactflow/dist/style.css';
import { INode } from '../../interfaces';
import { initialNodes } from '../../utils';


const nodeTypes = {
  custom: ChatBox,
};

let id = 2;
const getId = () => `${id++}`;

const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isEdit, setIsEdit] = useAtom(isEditAtom)
  const [, setNodesArray] = useAtom(nodesAtom)
  const [, setNode] = useAtom(nodeAtom)

  const toggleEdit = () => setIsEdit(!isEdit)

  const handleNodeClick = (_event: any, node: INode) => {
    toggleEdit()
    setNode(node)
  };

  const onConnect = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      //@ts-expect-error next-line
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: "custom",
        position,
        data: { header: 'Send Message', content: "Hi there, click me to edit." },
      };

      setNodes((nds) => ([...nds, newNode]));
      //@ts-expect-error next-line
      setNodesArray(nodesArray => ([...nodesArray, newNode]))

    },
    [reactFlowInstance],
  );

  return (
    <div className='flex' >
      <ReactFlowProvider >
        <div className="w-[80vw] h-screen" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            //@ts-expect-error next-line
            onNodeClick={handleNodeClick}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            //@ts-expect-error next-line
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
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

