import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeflex/primeflex.css"; // Flex utilities
import TaskList from "./components/TaskList";

function App() {  
  return (
    <div className="p-5">
      <TaskList />
    </div>
  );
}

export default App;