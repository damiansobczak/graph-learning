import Canvas from "./components/features/Canvas/Canvas";
import Panel from "./components/features/Panel/Panel";
import Layout from "./components/layout";
import React, { useState } from "react";
import { Node } from "reactflow";
import Subjects from "./components/features/Subjects/Subjects";

export default function App() {
	const [panelState, setPanelState] = useState<null | string>(null);

	const handleNodeClick = (event: MouseEvent, node: Node) => {
		setPanelState(node.id);
	};

	return (
		<Layout>
			<Subjects />
			<Canvas onNodeClick={handleNodeClick} />
			<Panel state={panelState} handleClose={() => setPanelState(null)} />
		</Layout>
	);
}
