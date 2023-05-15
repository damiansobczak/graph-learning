import React, { useEffect, useState } from "react";
import IconClose from "../../common/Icons/IconClose";
import { useSupabaseStore } from "../../../lib/store/store";
import { generateRandomSubjectTitle } from "../../../lib/utils/database";
import IconCheck from "../../common/Icons/IconCheck";

const Subjects: React.FC = () => {
	const [input, setInput] = useState("");
	const [addMode, setAddMode] = useState(false);

	const storeFetchSubjects = useSupabaseStore((state: any) => state.fetchSubjects);
	const storeRemoveSubject = useSupabaseStore((state: any) => state.removeSubject);
	const storeAddSubject = useSupabaseStore((state: any) => state.addSubject);
	const storeSubjects = useSupabaseStore((state: any) => state.subjects);

	useEffect(() => {
		const initializeSubjects = async () => {
			await storeFetchSubjects();
		};
		initializeSubjects();
	}, []);

	return (
		<aside className="w-[19rem] bg-neutral-100 pt-4 pb-20 flex flex-col border-r relative" style={{ height: "calc(100vh - 3rem)" }}>
			<ul className="w-full overflow-y-auto">
				{storeSubjects.map(({ id, title }: any) => (
					<li key={id}>
						<button className="w-full flex-1 text-neutral-800 text-left min-h-[3rem] max-h-12 px-4 flex items-center hover:bg-neutral-200 justify-between">
							{title}
							<div onClick={async () => await storeRemoveSubject(id)}>
								<IconClose />
							</div>
						</button>
					</li>
				))}
			</ul>
			{!addMode && (
				<button className="text-neutral-800 text-left h-12 px-4 flex items-center bg-neutral-200 hover:bg-neutral-300 absolute bottom-6 w-full border-t border-neutral-300" onClick={() => setAddMode(true)}>
					+ Add subject
				</button>
			)}
			{addMode && (
				<div className="space-x-2 z-10 text-neutral-800 text-left h-12 px-4 flex items-center bg-neutral-200 hover:bg-neutral-300 absolute bottom-6 w-full border-t border-neutral-300">
					<input className="bg-transparent outline-0" placeholder="Type..." onChange={(e) => setInput(e.currentTarget.value)} />
					<button
						className="hover:opacity-50 text-neutral-500"
						onClick={async () => {
							await storeAddSubject(input);
							setAddMode(false);
						}}
					>
						<IconCheck />
					</button>
					<button className="hover:opacity-50 text-neutral-500" onClick={() => setAddMode(false)}>
						<IconClose />
					</button>
				</div>
			)}
		</aside>
	);
};

export default Subjects;
