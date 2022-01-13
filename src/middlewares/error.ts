import { ApiError } from "@/utils/errors";
import { Request, Response, NextFunction } from "express";

export const error = async (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ success: false, message: err.message, errors: err.errors });
	} else {
		console.log(err);
	}
	return res.status(200).json({ success: false, message: "Непредвиденная ошибка" });
};
