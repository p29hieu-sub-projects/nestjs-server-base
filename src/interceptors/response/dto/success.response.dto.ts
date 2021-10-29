import { AppResponse } from "@/interceptors/response/dto/response.dto";

export interface SuccessResponse<T> extends AppResponse<T> {
  data: T;
  error: null;
}
