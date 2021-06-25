import { AuthProvider } from "contexts/AuthContext";
import "styles/globals.scss";
import { Router } from "./Router";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
