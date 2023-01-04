import { useEffect, useState } from "react";
import { Spinner } from "../layout/Spinner";
import { UserItem } from "./UserItem";

export const UserResults = () => {
	const apiUrl = "https://api.github.com";

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const response = await fetch(`${apiUrl}/users`);
		const data = await response.json();

		setUsers(data);
		setLoading(false);
	};

	if (!loading) {
		return (
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
				{users.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	} else {
		return <Spinner />;
	}
};
