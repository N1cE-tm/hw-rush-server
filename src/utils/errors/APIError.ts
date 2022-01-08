export default class ApiError extends Error {
	status;
	errors;

	constructor(status: number, message: string, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static Unauthorized() {
		return new ApiError(401, "Unauthorized");
	}

	static AuthenticationTimeout() {
		return new ApiError(419, "Need refresh access token");
	}

	static BadRequest(message: string, errors = []) {
		return new ApiError(400, message, errors);
	}
}
