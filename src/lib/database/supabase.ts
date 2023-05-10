import { createClient } from "@supabase/supabase-js";
import { Database } from "../interfaces/ISupabase";
import { Node } from "../interfaces/INode";
import { transformNodesData } from "../utils/database";

const supabaseUrl = "https://gtnegwtaetvnvadfqsfm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0bmVnd3RhZXR2bnZhZGZxc2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM1NTYzMzIsImV4cCI6MTk5OTEzMjMzMn0.INERmbF96ibafjj-RcqoUainKr5OUitmtoErBKbCYBc";
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const fetchNodesDb = async () => {
	const { data, error } = await supabase.from("nodes").select();

	return transformNodesData(data);
};

export const addNodeDb = async ({ label, x, y, type }: { label: string; x: number; y: number; type: string }) => {
	const { data, error } = await supabase.from("nodes").insert([{ label, x, y, type }]).select();
	return transformNodesData(data)[0];
};

export const updateNodeLabelDb = ({ id, label }: { id: number; label: string }): Node => {
	return {} as any;
};

export const deleteNodeDb = (id: number): Node => {
	return {} as any;
};

export const fetchEdgesDb = async () => {
	const { data, error } = await supabase.from("edges").select();

	return data;
};

export const addEdgeDb = async ({ source, target }: { source: string; target: string }) => {
	const { data, error } = await supabase.from("edges").insert([{ source, target }]).select();
	return data;
};
