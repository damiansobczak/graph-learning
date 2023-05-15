import React, { useCallback, useEffect, useMemo, useRef } from "react";
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge as addEdgeFlow, ReactFlowProvider, useReactFlow, BackgroundVariant } from "reactflow";

import "reactflow/dist/style.css";
import Node from "../Node/Node";
import { supabase, addNodeDb, addEdgeDb } from "../../../lib/database/supabase";
import { useLocalStore, useSupabaseStore } from "../../../lib/store/store";

let id = 3;
const getId = () => `${id++}`;

function Canvas({ onNodeClick }: any) {
	const { project } = useReactFlow();
	const reactFlowWrapper = useRef(null);

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const storeFetchNodes = useSupabaseStore((state: any) => state.fetchNodes);
	const storeDeleteNode = useSupabaseStore((state: any) => state.deleteNode);
	const storeAddNode = useSupabaseStore((state: any) => state.addNode);
	const storeFetchEdges = useSupabaseStore((state: any) => state.fetchEdges);
	const storeAddEdge = useSupabaseStore((state: any) => state.addEdge);

	/**
	 * Supabase
	 */

	const fetchNodes = useCallback(async () => {
		const nodes = await storeFetchNodes();
		setNodes(nodes as any);
	}, []);

	const fetchEdges = useCallback(async () => {
		const edges = await storeFetchEdges();
		setEdges(edges);
	}, []);

	useEffect(() => {
		fetchNodes();
		fetchEdges();
	}, [fetchNodes, fetchEdges]);

	const onNodesDelete = async ([{ id }]: any) => {
		const nodes = await storeDeleteNode(id);
		setNodes(nodes);
	};

	/**
	 * End Supabase
	 */

	const onConnect = useCallback((params: any) => setEdges((eds) => addEdgeFlow(params, eds)), [setEdges]);

	const nodeTypes = useMemo(() => ({ textUpdater: Node }), []);

	const connectingNodeId = useRef<string | null>(null);

	const onConnectStart = useCallback((_: any, { nodeId }: any) => {
		connectingNodeId.current = nodeId;
	}, []);

	const onConnectEnd = useCallback(
		async (event: any) => {
			const targetIsPane = event.target.classList.contains("react-flow__pane");

			if (targetIsPane) {
				// we need to remove the wrapper bounds, in order to get the correct position
				const { top, left } = (reactFlowWrapper.current as any).getBoundingClientRect();
				const id = getId();

				const node = await storeAddNode({ label: `Node ${id}`, x: event.clientX - left, y: event.clientY - top, type: "textUpdater" });
				setNodes((nodes: any) => [...nodes, node]);

				const edge = await storeAddEdge({ source: connectingNodeId?.current || "", target: node?.id });
				setEdges((edges: any) => [...edges, ...(edge as any)]);
			}
		},
		[project]
	);

	return (
		<div className="w-screen" style={{ height: "calc(100vh - 3rem)" }} ref={reactFlowWrapper}>
			<ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onNodesDelete={onNodesDelete} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} onNodeClick={onNodeClick} onConnectStart={onConnectStart} onConnectEnd={onConnectEnd}>
				<Controls />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}

export default ({ onNodeClick }: any) => (
	<ReactFlowProvider>
		<Canvas onNodeClick={onNodeClick} />
	</ReactFlowProvider>
);
