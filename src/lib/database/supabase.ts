import { createClient } from "@supabase/supabase-js";
import { Database } from "../interfaces/ISupabase";
import { Node } from "../interfaces/INode";
import { transformNodesData } from "../utils/database";

const supabaseUrl = "https://gtnegwtaetvnvadfqsfm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0bmVnd3RhZXR2bnZhZGZxc2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM1NTYzMzIsImV4cCI6MTk5OTEzMjMzMn0.INERmbF96ibafjj-RcqoUainKr5OUitmtoErBKbCYBc";
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const fetchNodesDb = async () => {
	const { data } = await supabase.from("nodes").select();

	return transformNodesData(data);
};

export const addNodeDb = async ({ label, x, y, type }: { label: string; x: number; y: number; type: string }) => {
	const { data } = await supabase.from("nodes").insert([{ label, x, y, type }]).select();
	return transformNodesData(data)[0];
};

export const updateNodeLabelDb = ({ id, label }: { id: number; label: string }): Node => {
	return {} as any;
};

export const deleteNodeDb = async (id: number) => {
	const { data } = await supabase.from("nodes").delete().eq("id", id).select();

	return transformNodesData(data);
};

export const fetchEdgesDb = async () => {
	const { data } = await supabase.from("edges").select();

	return data;
};

export const addEdgeDb = async ({ source, target }: { source: string; target: string }) => {
	const { data } = await supabase.from("edges").insert([{ source, target }]).select();
	return data;
};

// Subjects
export const fetchSubjectsDb = async () => {
	const { data } = await supabase.from("subjects").select("id, title");

	return data;
};

export const removeSubjectDb = async (id: number) => {
	const { data } = await supabase.from("subjects").delete().eq("id", id);

	return data;
};

export const addSubjectDb = async (label: string) => {
	const { data } = await supabase
		.from("subjects")
		.insert([{ title: label }])
		.select();

	return data;
};
