import { create } from "zustand";
import { addEdgeDb, addNodeDb, deleteNodeDb, fetchEdgesDb, fetchNodesDb, fetchSubjectsDb, removeSubjectDb, addSubjectDb } from "../database/supabase";
import { persist } from "zustand/middleware";

export const useSupabaseStore = create((set, get) => ({
	nodes: [],
	edges: [],
	subjects: [],
	loading: false,
	error: null,
	fetchSubjects: async () => {
		set({ loading: true });
		const subjects = await fetchSubjectsDb();
		set({ subjects, loading: false });
		return subjects;
	},
	removeSubject: async (id: number) => {
		set({ loading: true });
		const subject = await removeSubjectDb(id);
		const subjects = await fetchSubjectsDb();
		set({ subjects, loading: false });
		return subjects;
	},
	addSubject: async (label: string) => {
		set({ loading: true });
		const subject = await addSubjectDb(label);
		const subjects = await fetchSubjectsDb();
		set({ subjects, loading: false });
		return subjects;
	},
	fetchNodes: async () => {
		set({ loading: true });
		const nodes = await fetchNodesDb();
		set({ nodes, loading: false });
		return nodes;
	},
	deleteNode: async (id: number) => {
		set({ loading: true });
		const deleted = await deleteNodeDb(id);
		const nodes = await fetchNodesDb();
		set({ nodes, loading: false });
		return nodes;
	},
	addNode: async ({ label, x, y, type }: { label: string; x: number; y: number; type: string }) => {
		set({ loading: true });
		const node = await addNodeDb({ label, x, y, type });
		set({ nodes: [...(get() as any).nodes, node], loading: false });
		return node;
	},
	fetchEdges: async () => {
		set({ loading: true });
		const edges = await fetchEdgesDb();
		set({ edges, loading: false });
		return edges;
	},
	addEdge: async ({ source, target }: { source: string; target: string }) => {
		set({ loading: true });
		const edge = await addEdgeDb({ source, target });
		set({ edges: [...(get() as any).edges, edge], loading: false });
		return edge;
	},
}));

export const useLocalStore = create(
	persist(
		(set, get) => ({
			nodes: [],
			edges: [],
			subjects: [],
			loading: false,
			error: null,
			fetchNodes: () => {
				set({ loading: true });
				const nodes = (get() as any).nodes;
				set({ nodes, loading: false });
			},
			fetchEdges: () => {
				set({ loading: true });
				const edges = (get() as any).edges;
				set({ edges, loading: false });
			},
		}),
		{
			name: "graph-learning-storage", // unique name
			storage: localStorage, // (optional) by default, 'localStorage' is used
		} as any
	)
);
