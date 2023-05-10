import React, { useCallback, useEffect, useMemo, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
  BackgroundVariant
} from "reactflow";

import "reactflow/dist/style.css";
import Node from "../Node/Node";
import { initialNodes } from "../../../lib/interfaces/INode";
import { initialEdges } from "../../../lib/interfaces/IEdge";
import { supabase } from "../../../lib/database/supabase";

let id = 3;
const getId = () => `${id++}`;

function Canvas({onNodeClick}: any) {
  const { project } = useReactFlow();
  const reactFlowWrapper = useRef(null);


  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  /**
   * Supabase
   */

  const fetchNodes = useCallback(async () => {
    const { data, error } = await supabase.from("nodes").select();

    if (data) {
      const transformedData = data.map((item) => ({
        id: item.id.toString(),
        type: item.type,
        position: { x: item.x, y: item.y },
        data: { label: item.label, description: item.description },
      }));
      setNodes(transformedData as any);
    }
  }, []);

  useEffect(() => {
    fetchNodes();
  }, [fetchNodes]);

  const addNode = async (label: string, x: number, y: number, type: string) => {
    const { data, error } = await supabase.from("nodes").insert([{ label, x, y, type }]).select();

    if (data) {
      const transformedData = data.map((item) => ({
        id: item.id.toString(),
        type: item.type,
        position: { x: item.x, y: item.y },
        data: { label: item.label, description: item.description },
      }));
      setNodes((nodes: any) => [...nodes, ...transformedData]);

      return transformedData[0] as any;
    }
  };


  /**
   * End Supabase
   */

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => ({ textUpdater: Node }), []);

  const connectingNodeId = useRef(null);

  const onConnectStart = useCallback((_: any, { nodeId }: any) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    async (event: any) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = (reactFlowWrapper.current as any).getBoundingClientRect();
        const id = getId();
       
        const newNode = await addNode(`Node ${id}`, event.clientX - left, event.clientY - top, 'textUpdater');

        setEdges((eds: any) => eds.concat({ id, source: connectingNodeId.current, target: newNode?.id }));
      }
    },
    [project]
  );

  return (
    <div className="w-screen" style={{ height: 'calc(100vh - 3rem)'}} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}


export default ({ onNodeClick }: any) => (
  <ReactFlowProvider>
    <Canvas onNodeClick={onNodeClick}/>
  </ReactFlowProvider>
);