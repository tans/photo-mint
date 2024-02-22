import "./App.css";
import Editor from "./Editor";

function App() {
  return (
    <div className="flex bg-white bg-opacity-50">
      <div
        className=" absolute top-0 z-20 flex h-7 w-full items-center justify-center bg-white text-sm font-black shadow-sm"
        data-tauri-drag-region
      >
        <img src="/logo.png" className="h-6 w-6" />
        Photo Mint
      </div>

      <div className="h-screen grow overflow-hidden pt-8 opacity-90">
        <div className="m-2 ">
          <Editor></Editor>
        </div>
      </div>
    </div>
  );
}

export default App;
