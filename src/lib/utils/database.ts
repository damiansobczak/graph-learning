export const transformNodesData = (data: any) => {
	let transformed;

	if (data) {
		transformed = data.map((item: any) => ({
			id: item.id.toString(),
			type: item.type,
			position: { x: item.x, y: item.y },
			data: { label: item.label, description: item.description },
		}));
		return transformed;
	}
};

export const generateRandomSubjectTitle = () => {
	return [...Array(10)].map(() => ((Math.random() * 36) | 0).toString(36)).join("");
};
