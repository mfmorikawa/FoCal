import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";

interface Props {
  colors: string[];
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
}

export const ColorList: React.FC<Props> = ({ colors, listId, listType }) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      direction="horizontal"
      isCombineEnabled={false}
    >
      {(dropProvided) => (
        <div {...dropProvided.droppableProps}>
          <div>
            <div>
              <div style={{ display: "flex" }} ref={dropProvided.innerRef}>
                {colors.map((color, index) => (
                  <Draggable key={color} draggableId={color} index={index}>
                    {(dragProvided) => (
                      <div
                        {...dragProvided.dragHandleProps}
                        {...dragProvided.draggableProps}
                        ref={dragProvided.innerRef}
                      >
                        <div style={{ backgroundColor: color }}>{color}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};
