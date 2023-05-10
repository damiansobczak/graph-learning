import React from 'react';
import { IEdge } from './IEdge';

export default function Edge({ x1, y1, x2, y2 }: IEdge) {
    const pathString = `M${x1},${y1} L${x2},${y2}`;

    return (
        <svg className='absolue top-0 left-0 w-full h-full text-neutral-400'>
            <path d={pathString} stroke="currentColor" strokeWidth="1" fill="currentColor" />
        </svg>
    );
}