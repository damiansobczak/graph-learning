import React, { createContext, useContext, useEffect, useState } from "react";
import { Subject } from "../interfaces/ISubject";

export const LocalStorageContext = createContext({
  subjects: [{ id: 1, title: "Angular" }],
  addSubject: (subject: Subject) => {},
  removeSubject: (id: string) => {},
});

const getInitialState = () => {
  const subjects = localStorage.getItem("subjects");
  return subjects ? JSON.parse(subjects) : {subjects: [{ id: 1, title: "Angular" }]};
};

const LocalStorageContextProvider = (props: any) => {
  const [subjects, setSubjects] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = (subject: Subject) =>
    setSubjects((prev: any) => ({
      ...prev,
      subjects: [...prev.subjects, subject],
    }));

  const removeSubject = (id: number) =>
    setSubjects((prev: any) => ({
      ...prev,
      subjects: [...prev.subjects.filter((subject: Subject) => subject.id !== id)],
    }));

  return (
    <LocalStorageContext.Provider value={{ addSubject, removeSubject, ...subjects }}>
      {props.children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorage = () => useContext(LocalStorageContext);

export default LocalStorageContextProvider;
