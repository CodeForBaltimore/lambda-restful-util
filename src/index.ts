// index.ts
/**
 * A AWS Lambda helper package
 * 
 * @module
 */
import HttpStatusCode from './HttpStatusCode'
import { APIGatewayProxyEvent } from 'aws-lambda'

/** Interfaces */
export interface HttpResponse {
  statusCode: number,
  headers: {
    'Access-Control-Allow-Origin': string,
    'Access-Control-Allow-Credentials': boolean
  },
  body: string | Record<string, unknown>
}

/**
 * Will return fully formatted and ready HTTP response for Lambda delivery
 * 
 * @param statusCode - An HTTP response code
 * @param format - If you need to parse your body send the parser here
 * 
 * @example
 * Sets a function to return a 200 OK response
 * ```ts
 * const ok = util.withStatusCode(200, JSON.stringify)
 * const bad = util.withStatusCode(400)
 * ```
 * 
 * @returns A function that can be called to send an HTTP response
 */
const withStatusCode = (statusCode: number, format?: Function): Function => {
  if (100 > statusCode || statusCode > 599) {
    throw new Error('status code out of range')
  }

  /**
   * The function that sends the HTTP response
   * 
   * @param data - The information you are sending
   * @param origin - What domain can receive this response
   * 
   * @example
   * Returns a JSON stringified var body to a localhost domain
   * ```ts
   * return ok(body, 'http://localhost')
   * ```
   * 
   * @returns Formatted and parsed response
   */
  return (data: string | Record<string, unknown> | Array<any> | void, origin = '*'): HttpResponse => {
    const response: HttpResponse = {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      },
      body: ''
    }

    // only send a body if there is data
    if (data) {
      response.body = (typeof format === 'function') ? format(data) : data
    }

    return response
  }
}

/**
 * Ensuring the header exists in the API request and then parses it
 * 
 * @param apiGatewayProxyEvent - The event coming from the API Gateway request
 * 
 * @returns The headers parsed into a Object
 */
const validateAndParseRequestHeaders = (apiGatewayProxyEvent: APIGatewayProxyEvent): Record<string, unknown> | null => {
  if (apiGatewayProxyEvent !== null && apiGatewayProxyEvent.headers !== null && apiGatewayProxyEvent.headers !== undefined) {
    const requestHeaders: Record<string, unknown> = apiGatewayProxyEvent.headers

    return requestHeaders
  }

  return null
}

/**
 * Ensuring the body eixists in the API request and then parses it
 * @param apiGatewayProxyEvent - The event coming from the API Gateway request
 * 
 * @returns The body parsed into an object 
 */
const validateAndParseRequestBody = (apiGatewayProxyEvent: APIGatewayProxyEvent): string | null => {
  if (apiGatewayProxyEvent !== null && apiGatewayProxyEvent.body !== null && apiGatewayProxyEvent.body !== undefined) {
    const requestBody: string = JSON.parse(apiGatewayProxyEvent.body)

    return requestBody
  }

  return null
}

export default {
  withStatusCode,
  validateAndParseRequestHeaders,
  validateAndParseRequestBody,
  HttpStatusCode
}
