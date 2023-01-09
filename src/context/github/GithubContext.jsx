import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const apiUrl = "https://api.github.com";

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	//NOTE - get initial users (testing porposes)
	const fetchUsers = async () => {
		setLoading();

		const response = await fetch(`${apiUrl}/users`);
		const data = await response.json();

		dispatch({
			type: "GET_USERS",
			payload: data,
		});
	};

	//NOTE - set loading
	const setLoading = () => {
		dispatch({
			type: "SET_LOADING",
		});
	};

	return (
		<GithubContext.Provider
			value={{ users: state.users, loading: state.loading, fetchUsers }}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
