import { HttpStatus } from "@nestjs/common";

import { AppResponse } from "@/interceptors/response/dto/response.dto";

export interface ExceptionResponse extends AppResponse<null> {
  error: {
    message: string;
    "user-agent": string;
    statusCode: number | HttpStatus;
    timestamp: string;
    ip: string | string[];
    path: string;
  };
}
