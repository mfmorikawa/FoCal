import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderColors } from "./reorder";
import { Loading } from "../../components/Loading";
import { ColorList } from "./AuthorList";

export type ColorMap = { [key: string]: string[] }

export default function Projects() {
  const [colorMap, setColors] = useState<ColorMap>({
    a: ["blue", "red"],
    b: ["pink"],
    c: ["green"]
  });
  return (
    <DragDropContext onDragEnd={({destination, source}) => {
      if (!destination) {
        return;
      }
      setColors(
        reorderColors(
          colorMap,
          source,
          destination
        )
      );
    }}>
      <div>
        {Object.entries(colorMap).map(([k,v]) => (
          <ColorList
            internalScroll
            key={k}
            listId={k}
            listType="CARD"
            colors={v}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
