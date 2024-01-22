import "./header.css";
import { BsPlus, BsSearch } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/features/todoSlice";
import { addTodos } from "../redux/features/todoSlice";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const { data } = useSelector((state) => state.todos);
  const [userdata, setUserdata] = useState({});
  const navigate=useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("https://todobackend-bici.onrender.com/login/sucess", {
        withCredentials: true,
      });
      // console.log("response", response)
      setUserdata(response.data.user);
    } catch (error) {
      console.log(error)
      // navigate('/')          
    }
  };

  useEffect(() => {
    getUser();
    dispatch(fetchTodos());
  }, []);


  const filterHandler = (e) => {
    setSelectedFilter(e.target.value);
  };

  const searchHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const logout = () => {
    window.open("https://todobackend-bici.onrender.com/logout", "_self");
  };

  const filteredData = data.filter((todo) => {
    const filterCondition =
      selectedFilter === "ALL" ||
      (selectedFilter === "COMPLETED" && todo.iscompleted) ||
      (selectedFilter === "INCOMPLETE" && !todo.iscompleted);

    const searchCondition = todo.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    return filterCondition && searchCondition;
  });

  const submitHandler = () => {
    if (todo.trim().length === 0) {
      return;
    }
    dispatch(addTodos(todo));
  };

  return (
    <>
      <header>
        <nav>
          <div className="left">
            <h1>Perosonal Issue Tracker</h1>
          </div>
          <div className="right">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {Object?.keys(userdata)?.length > 0 ? (
                <>
                  <li style={{ color: "black", fontWeight: "bold" }}>
                    {userdata?.displayName}
                  </li>

                  <li onClick={logout}>Logout</li>
                  <li>
                    <img
                      src={userdata?.image}
                      style={{ width: "50px", borderRadius: "50%" }}
                      alt=""
                    />
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </nav>
      </header>

      <div className="max-w-full md:max-w-4xl mx-auto mt-36 p-2 bg-orange-100 bg-opacity-60 rounded">
        <h2 className="mt-3 mb-6 text-2xl font-bold text-center uppercase">
          Personal TODO APP
        </h2>
        <div className="flex items-center mb-4">
          <input
            id="addTodoInput"
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Add Todo"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={submitHandler}
          >
            <BsPlus size={20} />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex space-x-4 items-center">
            <select
              className="text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none"
              onChange={filterHandler}
            >
              <option value="ALL">Default</option>
              <option value="COMPLETED">Completed</option>
              <option value="INCOMPLETE">Incomplete</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <input
              className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Search Todos"
              onChange={searchHandler}
            />
            <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
              <BsSearch size={20} />
            </button>
          </div>
        </div>
        {filteredData.length > 0 ? (
          <TodoList data={filteredData}></TodoList>
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
    </>
  );
}
