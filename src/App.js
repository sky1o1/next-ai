import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./router/AppRoute";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <Router>
      <MainLayout>
        <AppRoute />
      </MainLayout>
    </Router>
  );
}

export default App;
