import type { httpResponse } from "../protocols/http"
// retorno suprimido por sugestão do eslint
export const badRequest = (error: Error): httpResponse => ({
        statusCode: 400,
        body: error
    })
