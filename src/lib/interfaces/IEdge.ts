export interface Edge {
    id: string;
    source: string;
    target: string;
    type: 'simplebezier';
  }
    
  export const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2", type: 'simplebezier' }];