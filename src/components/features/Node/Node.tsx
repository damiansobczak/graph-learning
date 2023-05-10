import React, { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

export default function Node({data}: any) {
    const onChange: any = useCallback((evt: { target: { label: string; }; }) => {
        console.log(evt.target.label);
      }, []);
      
    return (
        <div className='p-4 rounded-lg border border-neutral-400 hover:border-neutral-800 hover:ring-4 ring-neutral-200 select-none transition-colors shadow-sm overflow-hidden bg-neutral-100 flex text-center max-w-xs cursor-pointer group/node'>
            <Handle type="target" position={Position.Left} />
            <input id="text" name="text" defaultValue={data.label} onChange={onChange} autoComplete="off" className="bg-transparent text-neutral-800 border-0 outline-none text-center" />
            <Handle type="source" position={Position.Right} id="a" />
        </div>
    );
}