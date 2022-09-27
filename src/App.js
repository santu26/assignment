import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Repos from "./components/Repos";
function App() {
  return (
    <div className="App">
      <h1>Most Starred Repo</h1>
      <Repos />
    </div>
  );
}

export default App;
