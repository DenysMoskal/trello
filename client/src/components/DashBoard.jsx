import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import List from "./List/List";
import {
  changeCardsOrder,
  changeCardsListOrder,
} from "../store/slices/listSlice";
import { useDispatch } from "react-redux";

const Draggeble = ({ lists }) => {
  const dispatch = useDispatch();

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list.cards);

    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source.cards);

    const destClone = Array.from(destination.cards);

    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};

    result[droppableSource.droppableId] = sourceClone;

    result[droppableDestination.droppableId] = destClone;

    return { result, removed };
  };

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(lists[sInd], source.index, destination.index);

      dispatch(changeCardsOrder({ listIndex: sInd, items }));
    } else {
      const { result } = move(lists[sInd], lists[dInd], source, destination);

      dispatch(
        changeCardsListOrder({
          sListIndex: sInd,
          dListIndex: dInd,
          items: result,
        })
      );
    }
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {lists?.map((list, ind) => (
            <React.Fragment key={list._id}>
              {lists.length > 0 && (
                <List list={list} key={list._id}>
                  <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {list.cards.map((card, index) => (
                          <Draggable
                            key={card._id}
                            draggableId={card._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card card={card} listId={list._id} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </List>
              )}
            </React.Fragment>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Draggeble;
