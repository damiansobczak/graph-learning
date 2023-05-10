import React, { createContext, useContext, useEffect, useState } from "react";
import { Subject } from "../interfaces/ISubject";
import { supabase } from "./supabase";

export const SupabaseStorageContext = createContext<any>({
  subjects: [{ id: 1, title: "Angular" }],
  addSubject: (subject: Subject) => {},
  removeSubject: (id: number) => {},
});

const getInitialState = async () => {
//   let { data: subjects, error } = await supabase.from("subjects").select("id");

  return { subjects: [{ id: 1, title: "Angular" }] };
};

const SupabaseStorageContextProvider = (props: any) => {
  const [subjects, setSubjects] = useState(() => getInitialState());

  const addSubject = (subject: Subject) =>
    setSubjects((prev: any) => ({
      ...prev,
      subjects: [...prev.subjects, subject],
    }));

  const removeSubject = (id: number) =>
    setSubjects((prev: any) => ({
      ...prev,
      subjects: [
        ...prev.subjects.filter((subject: Subject) => subject.id !== id),
      ],
    }));

  return (
    <SupabaseStorageContext.Provider
      value={{ addSubject, removeSubject, ...subjects }}
    >
      {props.children}
    </SupabaseStorageContext.Provider>
  );
};

export const useSupabaseStorage = () => useContext(SupabaseStorageContext);

export default SupabaseStorageContextProvider;
