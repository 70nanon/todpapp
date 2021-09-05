import { useState, useEffect } from "react";
import "./App.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ListGroup, InputGroup, FormControl, ListGroupItem } from 'react-bootstrap';
import Task from "./components/task";
import { fetchData, patchData } from './axios/axios';

function App() {
  const [characters, updateCharacters] = useState([]);

  const getTasks = async() => {
    const result = await fetchData()
    updateCharacters(result);
  }
  
  useEffect(() => {
    getTasks();
  }, []);

  function handleOnDragEnd(result: any) {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination?.index, 0, reorderedItem);
    items.forEach(async function(item:any, index) {
      await patchData(item.id, index)
    })
    updateCharacters(items);
  }
  
  function fetchDataOnClick() {
    fetchData();
    // ここにaxiosでタスクの追加をAPIに送信する処理を書く
  }
  // function handleDeleteTask(result: any) {
  //   const items = Array.from(characters);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   updateCharacters(items);

  //   // ここにaxiosでタスクの削除をAPIに送信する処理を書く
  // }
  return (
    <div className="App">
      <header className="App-header">
        <div className="header row py-3">
          <h1 className="col">TODOリスト</h1>
          <div className="col">
            <Button onClick={getTasks}>更新🔁</Button>
          </div>
        </div>
        <div className="row mx-3">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <div
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <ListGroup>
                    {characters?.map(({ id, title, comment, displayOrder }, index) => {
                      return (
                        <Task id={id} name={title} thumb={comment} index={index} displayOrder={displayOrder} />
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
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="outline-secondary" id="button-addon2">
                    Add
                  </Button>
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