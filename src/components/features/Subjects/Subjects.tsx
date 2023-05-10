import React, { useEffect, useState, useCallback } from "react";
import IconClose from "../../common/Icons/IconClose";
import { supabase } from "../../../lib/database/supabase";

interface Subject {
  id: number;
  title: string;
}

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetchSubjects = useCallback(async () => {
    const { data, error } = await supabase.from("subjects").select("id, title");

    if (data) {
      setSubjects(data);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const removeSubject = async (id: number) => {
    const { data, error } = await supabase.from("subjects").delete().eq("id", id);

    setSubjects((subjects) => subjects.filter((subject) => subject.id !== id));
  };

  const addSubject = async (label: string) => {
    const { data, error } = await supabase.from("subjects").insert([{ title: label }]).select();

    if (data) {
      setSubjects((subjects) => [...subjects, ...data]);
    }
  };

  const generateRandomSubjectTitle = () => {
    return [...Array(10)].map(() => ((Math.random() * 36) | 0).toString(36)).join("");
  };

  return (
    <aside
      className="w-[19rem] bg-neutral-100 pt-4 pb-20 flex flex-col border-r relative"
      style={{ height: "calc(100vh - 3rem)" }}
    >
      <ul className="w-full overflow-y-auto">
        {subjects.map(({ id, title }) => (
          <li key={id}>
            <button className="w-full flex-1 text-neutral-800 text-left min-h-[3rem] max-h-12 px-4 flex items-center hover:bg-neutral-200 justify-between">
              {title}
              <div onClick={() => removeSubject(id)}>
                <IconClose />
              </div>
            </button>
          </li>
        ))}
      </ul>
      <button
        className="text-neutral-800 text-left h-12 px-4 flex items-center bg-neutral-200 hover:bg-neutral-300 absolute bottom-6 w-full border-t border-neutral-300"
        onClick={() => addSubject(generateRandomSubjectTitle())}
      >
        + Add subject
      </button>
    </aside>
  );
};

export default Subjects;
