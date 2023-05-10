export interface INode { 
    id: number;
    title: string;
    previous_id: number;
    next_id: number;
    color?: string;
    positionX: number;
    positionY: number;
    topic_id: number
}