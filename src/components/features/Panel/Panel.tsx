import IconClose from "../../../components/common/Icons/IconClose";
import React, { useRef, useEffect, ReactElement } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function Panel({ state, handleClose }: any): ReactElement {
  const editorRef = useRef<any>(null);
  const panelRef = useRef<HTMLElement>(null);

  if (state) {
    return (
      <aside className="fixed top-1/2 right-6 transform -translate-y-1/2 py-6 h-full flex flex-col w-full max-w-2xl" ref={panelRef}>
        <div className="rounded-md bg-white border shadow-sm h-full flex-1 p-6 space-y-8 text-neutral-600 relative">
          <div>
            <p className="text-sm text-neutral-400">#123</p>
            <p className="text-lg text-neutral-800 font-semibold">Node title</p>
          </div>
          <div>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              onEditorChange={(t) => console.log(t)}
              initialValue="<p>This is the initial content of the editor.</p>"
              apiKey="ldpswp1admvp4pw9f4d8xpwfc72vw60uuyhx3m595qjq25jg"
              init={{
                menubar: false,
                inline: true,
                plugins: [
                  "advlist autolink lists link anchor",
                  "visualblocks codesample code",
                  "paste",
                ],
                codesample_languages: [
                  {text: 'HTML/XML', value: 'markup'},
                  {text: 'JavaScript', value: 'javascript'},
                  {text: 'CSS', value: 'css'},
                  {text: 'Typescript', value: 'typescript'},
                ],
                toolbar:
                  "undo redo |" +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat |" +
                  "codesample code",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
          <button
            className="absolute -top-4 right-4 hover:opacity-60"
            onClick={handleClose}
          >
            <IconClose />
          </button>
        </div>
      </aside>
    );
  }

  return <></>;
}
