[![codecov](https://codecov.io/gh/CodeForBaltimore/lambda-restful-util/branch/master/graph/badge.svg?token=287I7OIYA5)](https://codecov.io/gh/CodeForBaltimore/lambda-restful-util)

# Lambda RESTful Utility
A simple package to offer some quick wins for API devs!  

<!-- TOC -->

- [Lambda RESTful Utility](#lambda-restful-utility)
  - [What is this?](#what-is-this)
  - [Documentation](#documentation)
- [Setup](#setup)
  - [Using this product](#using-this-product)
    - [Using the validateAndParseRequestHeaders or validateAndParseRequestBody](#using-the-validateandparserequestheaders-or-validateandparserequestbody)
    - [Using the withStatusCode function](#using-the-withstatuscode-function)
      - [Adding a formatter](#adding-a-formatter)
  - [Testing](#testing)
- [Contributors ✨](#contributors-)

<!-- /TOC -->

## What is this? 

A simple npm package to make API dev easy on AWS Lambda.

## Documentation

We've included a `docs` folder with a [Best Practices](/docs/Best_Practices.md) document. Please review this document as well as our [CONTRIBUTING](./CONTRIBUTING.md) document before getting started with development contributions.

# Setup

To contribute to development you must have [NodeJS](https://nodejs.dev/) installed on your system.
Additionally this project uses yarn instead of npm. Please ensure you have yarn installed globally. After you do, simply run `yarn install` from the project root to install all dependencies. 

## Using this product

To use this package in your work simply run `npm install lambda-restful-util` or `yarn add lambda-restful-util` then include it in your code as with any other dependency. 

### Using the `validateAndParseRequestHeaders` or `validateAndParseRequestBody`

Both the `validateAndParseRequestHeaders` and `validateAndParseRequestBody` operate very similarly. Simply pass the `event` from API Gateway and both return a truthy object you can use if they're valid. For example:

```
exports.handler = async (event: APIGatewayProxyEvent) => {
  const requestHeaders = utils.validateAndParseRequestHeaders(event)
  const requestBody = utils.validateAndParseRequestBody(event)

  if (requestHeaders.Authorization && requestBody) {
    const token = requestHeaders.Authorization.replace('Bearer ', '')
    ...
  }
  ...
}
```

### Using the `withStatusCode` function

To use the `withStatusCode` you only _need_ to specify the response code when declaring the type of response. It is recommended to pass an approved origin for the request if applicable when calling that function. An example of a simple 200 response is as follows:

```
import util from 'lambda-restful-util'
...
const ok = util.withStatusCode(200)

exports.handler = async (event: APIGatewayProxyEvent) => {
  ...
  return ok('Hey Buddy!', 'http://localhost:8080')
}
```

For convenience this package includes every HTTP response for reference. To use the `HttpStatusCode` enum you can modify the above example by modifying the var: `const ok = util.withStatusCode(util.HttpStatusCode.OK, 'http://localhost:8080)`.

#### Adding a formatter

In addition to the `HttpStatusCode` you can pass a formatting function as an optional argument to `withStatusCode`. To add `JSON.stringify` simply modify the var again: `const ok = util.withStatusCode(util.HttpStatusCode.OK, 'http://localhost:8080, JSON.stringify)`.

If you know your response is going to be JSON this will simplify converting your Object to JSON. For example:

```
...
const ok = util.withStatusCode(util.HttpStatusCode.OK, JSON.stringify)
...
const res = {
  name: 'Homer Simpson'
  employer: 'Springfield Power Plant'
}
...
return ok(res)
```

The above will correctly return a JSON string as the 200 HTTP response to your API request. Consequently if you send `return ok('test')` that _will also_ return a JSON 200 response. If you **do not** want to return JSON simply don't pass a formatting argument when declaring the `ok` response.

## Testing

Run `yarn test`

# Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.jasonanton.com/"><img src="https://avatars.githubusercontent.com/u/6391564?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jason Anton</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/lambda-restful-util/commits?author=revjtanton" title="Code">💻</a> <a href="https://github.com/CodeForBaltimore/lambda-restful-util/commits?author=revjtanton" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/suryayelagam"><img src="https://avatars.githubusercontent.com/u/17008332?v=4?s=100" width="100px;" alt=""/><br /><sub><b>suryayelagam</b></sub></a><br /><a href="https://github.com/CodeForBaltimore/lambda-restful-util/pulls?q=is%3Apr+reviewed-by%3Asuryayelagam" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table> 

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<p align="center">
    <img src="docs/img/CfB.png" width="400">
</p>
