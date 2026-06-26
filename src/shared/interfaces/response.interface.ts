import {HttpStatus} from "@nestjs/common";

export type IControllerResponse<T> = {
    data: T;
    status: HttpStatus;
    message?: string;
    success: true;
} | {
    error: string;
    status: HttpStatus;
    message?: string;
    success: false;
}