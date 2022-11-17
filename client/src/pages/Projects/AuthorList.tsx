import React from "react";
import {
  Droppable,
  Draggable,
  DroppableProvided,
  DropResult,
  DragDropContext,
  DraggableLocation,
} from "react-beautiful-dnd";

interface Props {
  colors: string[];
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
}

export const ProjectTaskList: React.FC<Props> = ({
  colors,
  listId,
  listType,
}) => {
  return (
    <DragDropContext
      onDragEnd={({ source, destination }: DropResult) => {
        if (!destination) {
          return;
        }
      }}
    >
      <div className="bg-blue-500 p-2 h-screen flex justify-center place-items-start">
        <div className="flex justify-start place-items-start bg-slate-400 p-2 max-w-2xl overflow-auto">
          <div className="flex-col m-0"></div>
        </div>
      </div>
    </DragDropContext>
  );
};
