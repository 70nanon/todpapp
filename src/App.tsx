import React, { useState, useEffect } from "react";
import "./App.css";
import { CHARACTERS } from "./caractersData";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ListGroup } from 'react-bootstrap';
import Task from "./components/task";
import axios from 'axios';


function App() {
  const url = "https://todoapp.microcms.io/api/v1/tasks";
  const apiKey = "f7c56759-963c-4bfe-971d-bccf2a334220";
  const apiWhiteKey = "77d88407-5a2c-42f0-bcff-9e40f60a1ba6";
  const [characters, updateCharacters] = useState([]);

  const fetchData = async() => {
    const result = await axios.get(url, {
      headers: {
        "X-API-KEY": apiKey
      }
    })
    .then(res => (res.data.contents))
    .catch((e) => {
      if (e.response !== undefined) {
        // e.response.dataはanyになる
        return [{ id: null, title: null, comment: null}]
      }
    });
    
    updateCharacters(result);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  function handleOnDragEnd(result: any) {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination?.index, 0, reorderedItem);

    updateCharacters(items);

    // ここにaxiosで順番の更新をAPIに送信する処理を書く
    // api key f7c56759-963c-4bfe-971d-bccf2a334220
    // api post key 77d88407-5a2c-42f0-bcff-9e40f60a1ba6
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
        <h1>めそこスタンプ</h1>
        <Button onClick={fetchDataOnClick}>-------</Button>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <div
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <ListGroup>
                  {characters?.map(({ id, title, comment }, index) => {
                    return (
                      <Task id={id} name={title} thumb={comment} index={index} />
                    );
                  })}
                  {provided.placeholder}
                </ListGroup>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;