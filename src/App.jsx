import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto mx-3 my-5 rounded-xl bg-slate-300 p-5 min-h-[80vh] md:w-2/3">
        <h1 className="font-bold text-center text-2xl">
          KeepNotes - A Safe Place For Your Study Material
        </h1>
        <div className="md:mx-4 lg:mx-5 xl:mx-6">
          <div className="addTodo my-5">
            <h2 className="text-lg font-bold my-2 mx-5">ADD A NOTE</h2>
            <div className="flex">
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                className="w-4/5 mx-5 rounded-md py-1 px-3"
              />
              <button
                onClick={handleAdd}
                disabled={todo.length <= 3}
                className="bg-slate-700 hover:bg-slate-900 p-3 py-1 text-white rounded-md mx-5 font-bold text-sm w-1/5"
              >
                Save
              </button>
            </div>
          </div>
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="mx-5"
          />
          Show Finished
          <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-5"></div>
          <h2 className="text-lg font-bold mx-5 my-2">SAVED NOTES</h2>
          <div className="todos">
            {todos.length === 0 && (
              <div className="m-5">No Todos To Display</div>
            )}
            {todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex md:w-2/3 mx-5 my-3 justify-between"
                  >
                    <div className="flex gap-5 my-1">
                      <input
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        name={item.id}
                      />
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex h-full my-1">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="bg-slate-700 hover:bg-slate-900 p-4 py-2 text-white rounded-md mx-2 font-bold text-sm"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="bg-slate-700 hover:bg-slate-900 p-4 py-2 text-white rounded-md mx-2 font-bold text-sm"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
