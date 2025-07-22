import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RegisterForm from "./components/RegisterForm";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<RegisterForm />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	);
}

export default App;
