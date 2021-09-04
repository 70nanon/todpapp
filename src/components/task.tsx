import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroupItem } from 'react-bootstrap';

function Task(props: any) {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided) => (
        <ListGroupItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="my-2 rounded"
        >
          <div className="characters-thumb">
          </div>
          <p className="m-0">{props.name}</p>
        </ListGroupItem>
      )}
    </Draggable>
  )
}

export default Task;
