// Excerpt from https://github.com/microsoft/opensource-management-portal/blob/main/transitional.ts
export class ErrorHelper {
    static IsNotFound(error) {
        const statusNumber = ErrorHelper.GetStatus(error);
        return !!statusNumber && statusNumber === 404;
    }
    static GetStatus(error) {
        const asAny = error;
        if (asAny?.isAxiosError === true) {
            const axiosError = asAny;
            if (axiosError?.response?.status) {
                return axiosError.response.status;
            }
        }
        if (asAny?.statusCode && typeof asAny.statusCode === 'number') {
            return asAny.statusCode;
        }
        if (asAny?.code && typeof asAny.code === 'number') {
            return asAny.code;
        }
        if (asAny?.status) {
            const status = asAny.status;
            const type = typeof status;
            if (type === 'number') {
                return status;
            }
            else if (type === 'string') {
                return Number(status);
            }
            else {
                console.warn(`Unsupported error.status type: ${type}`);
                return null;
            }
        }
        return null;
    }
}
