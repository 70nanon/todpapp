import { Draggable } from "react-beautiful-dnd";
import { Button, ListGroupItem } from 'react-bootstrap';

function Task(props: any) {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided) => (
        <ListGroupItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="my-2 py-2 rounded"
        >
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4">{props.name}</div>
            <div className="col-4">
              <Button 
                onClick={() => {props.deleteTask(props.id)}}
              >
                delete
              </Button>
            </div>
          </div>
        </ListGroupItem>
      )}
    </Draggable>
  )
}

export default Task;
