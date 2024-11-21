export function createHttpException(errorCode: number, message: string | any): Error {
  const error = new Error(message)
  ;(error as any).errorCode = errorCode
  return error
}
