import User from "src/entities/User";

export interface Login {
	user: User;
	token: string;
	refreshToken: string;
}