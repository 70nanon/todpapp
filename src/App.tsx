import { useState, useEffect } from "react";
import "./App.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ListGroup, InputGroup, FormControl, ListGroupItem } from 'react-bootstrap';
import Task from "./components/task";
import { fetchData, patchData, postData, deleteData } from './axios/axios';

type postTask = {
  id?: string;
  title: string;
  comment?: string;
  displayOrder: number;
}

function App() {
  const [characters, updateCharacters] = useState<postTask[]>([]);
  const [title, updateTitle] = useState('')

  const getTasks = async() => {
    const result = await fetchData()
    updateCharacters(result);
  }
  
  useEffect(() => {
    getTasks();
  }, []);

  // タスクの順番移動
  const handleOnDragEnd = (result: any) => {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination?.index, 0, reorderedItem);
    items.forEach(async function(item:any, index) {
      await patchData(item.id, index)
    })
    updateCharacters(items);
  }

  // タスクの追加
  const handlePostTask = () => {
    const items = Array.from(characters);
    const postTask = async() => {
      const res = await postData(items.length + 1, title)
      const newPost:postTask = {id: res.id, title: title, displayOrder: items.length + 1}
      items.push(newPost)
      updateCharacters(items);
    }
    postTask();
  }

  // タスクの削除
  const hundleDeleteTask = (id:string) => {
    const items = Array.from(characters);
    deleteData(id);
    const newItems = items.filter(e => e.id !== id);
    updateCharacters(newItems);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header row py-3">
          <h1 className="col">TODO List</h1>
          <div className="col">
            <Button onClick={getTasks}>reload</Button>
          </div>
        </div>
        <div className="mainList row mx-auto mx-3">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters mx-auto">
              {(provided) => (
                <div
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <ListGroup>
                    {characters?.map(({ id, title, comment, displayOrder }, index) => {
                      return (
                        <Task deleteTask={hundleDeleteTask} id={id} name={title} thumb={comment} index={index} displayOrder={displayOrder} />
                      );
                    })}
                    {provided.placeholder}
                  </ListGroup>
                </div>
              )}
            </Droppable>
            <ListGroup className="characters p-2">
              <ListGroupItem className="rounded mx-1" >
                <InputGroup>
                  <FormControl
                    placeholder="task title"
                    aria-label="task title"
                    aria-describedby="basic-addon2"
                    type="title"
                    value={title}
                    onChange={(e)=> {updateTitle(e.target.value)}}
                  />
                  <Button onClick={handlePostTask} variant="outline-secondary" id="button-addon2"> Add </Button>
                </InputGroup>
              </ListGroupItem>
            </ListGroup>
          </DragDropContext>
        </div>
      </header>
    </div>
  );
}

export default App;