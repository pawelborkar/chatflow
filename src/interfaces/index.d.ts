export interface INodeContentProps {
  data: {
    header: string;
    content: string;
  }
}

export interface INode {
  id: string;
  type: string;
  data: {
    header: string;
    content: string;
  };
  position?: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
}
