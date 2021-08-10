import { HttpErrorResponse } from '@angular/common/http';

export interface ErrorResp extends HttpErrorResponse {
  error: {
    estado: string;
    mensaje: string;
  };
}
