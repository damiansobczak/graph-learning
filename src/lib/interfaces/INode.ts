  export interface NodePosition {
    x: number;
    y: number;
  }
  
  export interface NodeData {
    label: string;
    description?: string
  }
  
  export interface Node {
    id: string;
    type: 'textUpdater';
    position: NodePosition;
    data: NodeData;
  }

  export const initialNodes: Node[] = [
    { id: '1', type: 'textUpdater', position: { x: 100, y: 100 }, data: { label: '123' } },
    { id: '2', type: 'textUpdater', position: { x: 400, y: 200 }, data: { label: '456' } },
  ];

  