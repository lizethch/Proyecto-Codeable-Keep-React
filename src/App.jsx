
import AuthenticatedApp from "./AuthenticatedApp ";
import UnathenticatedApp from "./UnathenticatedApp";
import { useAuth } from "./context/Auth-Context";

function App() {
  const { user } = useAuth();
  return user ? (
    <AuthenticatedApp />
  ) : (
    <UnathenticatedApp />
  );
}

export default App;
