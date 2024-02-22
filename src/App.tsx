import "./App.css";
import Editor from "./Editor";

function App() {
  return (
    <div className="flex bg-white bg-opacity-50">
      <div
        className="absolute top-0 z-20 h-7 w-full bg-white shadow-sm"
        data-tauri-drag-region
      />

      <div className="h-screen grow overflow-hidden pt-8 opacity-90">
        <div className="m-2 ">
          <Editor></Editor>
        </div>
      </div>
    </div>
  );
}

export default App;
