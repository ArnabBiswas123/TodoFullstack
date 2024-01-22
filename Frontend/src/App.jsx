import "./App.css";
import Todo from "./components/Todo";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Error from "./components/Error";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { Environment, OrbitControls } from "@react-three/drei";
import Earth from "../public/Earth";

function App() {
  return (
 
    <Provider store={store}>
      <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <ambientLight></ambientLight>
        <OrbitControls></OrbitControls>
        <Suspense fallback={null}>
          <Earth></Earth>
        </Suspense>
        <Environment preset="sunset" />
        </Canvas>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/todo" element={<Todo></Todo>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </Provider>
  
  );
}

export default App;
