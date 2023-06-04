import type { AxiosError } from 'axios';

// Excerpt from https://github.com/microsoft/opensource-management-portal/blob/main/transitional.ts

export class ErrorHelper {
  public static IsNotFound(error: Error): boolean {
    const statusNumber = ErrorHelper.GetStatus(error);
    return !!statusNumber && statusNumber === 404;
  }

  public static GetStatus(error: Error): number | null {
    const asAny = error as any;
    if (asAny?.isAxiosError === true) {
      const axiosError = asAny as AxiosError;
      if (axiosError?.response?.status) {
        return axiosError.response.status;
      }
    }
    if (asAny?.statusCode && typeof asAny.statusCode === 'number') {
      return asAny.statusCode as number;
    }
    if (asAny?.code && typeof asAny.code === 'number') {
      return asAny.code as number;
    }
    if (asAny?.status) {
      const status = asAny.status;
      const type = typeof status;
      if (type === 'number') {
        return status;
      } else if (type === 'string') {
        return Number(status);
      } else {
        console.warn(`Unsupported error.status type: ${type}`);
        return null;
      }
    }
    return null;
  }
}