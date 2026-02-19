---
layout: post
title: Free OpenAPI Generators
date: 2026-02-19 14:28:28
excerpt: Comparison of free OpenAPI generators.
categories: openapi generator typescript sdk
---

This post compares free [OpenAPI generators](https://github.com/remarkablemark/openapi-generator-examples):

- [OpenAPI Generator](#openapi-generator)
- [Fern](#fern)
- [Hey API](#hey-api)
- [Kiota](#kiota)

<!-- prettier-ignore-start -->

| | OpenAPI Generator | Fern | Hey API | Kiota |
| --- | --- | --- | --- | --- |
| **Open-source** | ✅ OSS | Open-core | ✅ OSS | ✅ OSS |
| **Multi-language** | ✅ 50+ | ✅ Major | ❌ TS only | ✅ Major |
| **Server stubs** | ✅ Yes | ⚠️ Limited | ❌ No | ❌ No |
| **SDK quality** | ⚠️ Variable | ✅ High | ✅ High (TS) | ✅ Strongly typed |
| **Production defaults** | ⚠️ Needs tuning | ✅ Included | ✅ Included | ✅ Included |
| **Docs platform** | ⚠️ Basic | ✅ Integrated | ⚠️ Limited | ❌ No |
| **Extensibility** | ✅ Templates | ⚠️ Platform | ✅ TS ecosystem | ⚠️ Limited |
| **Best fit** | Broad coverage | API product | TS apps | Large structured APIs |

<!-- prettier-ignore-end -->

## OpenAPI Spec

Given the `openapi.yaml`:

```yaml
openapi: 3.1.0
info:
  title: Users API
  version: 1.0.0

servers:
  - url: https://api.example.com

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer

  schemas:
    User:
      type: object
      required:
        - id
        - email
      properties:
        id:
          type: string
        email:
          type: string
        name:
          type: string

security:
  - bearerAuth: []

paths:
  /v1/users/{id}:
    get:
      operationId: getUser
      summary: Get a user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: A user
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '401':
          description: Unauthorized
```

## OpenAPI Generator

[OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) is an open source generator that supports many languages.

### Prerequisites

- [Node 18+](https://nodejs.org/)
- [Java 11+](https://www.java.com/)

### Generate

Create `openapi-generator.config.yaml`:

```yaml
generatorName: typescript-fetch
inputSpec: ./openapi.yaml
outputDir: ./sdk
additionalProperties:
  npmName: '@your-org/sdk'
  npmVersion: '0.1.0'
  supportsES6: true
```

Generate the TypeScript SDK:

```sh
npx openapi-generator-cli generate -c openapi-generator.config.yaml
```

### Build

Build the package:

```sh
npm --prefix sdk install
```

### Usage

Code example:

```ts
import { Configuration, DefaultApi, type GetUserRequest } from './sdk';

const config = new Configuration({
  accessToken: 'YOUR BEARER TOKEN',
});

const api = new DefaultApi(config);

const body: GetUserRequest = {
  id: 'user-123',
};

api.getUser(body).then((user) => {
  console.log(user.email);
});
```

## Fern

[Fern](https://github.com/fern-api/fern) is an open-core generator with a focus on DX (developer experience).

### Prerequisites

- [Node 18+](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Generate

Initialize Fern:

```sh
npx fern-api init --openapi ./openapi.yaml
```

Generate the TypeScript SDK:

```sh
npx fern-api generate --local
```

### Build

Go to the SDK folder:

```sh
cd ./sdks/typescript/
```

Add `package.json`:

```json
{
  "name": "@your-org/sdk",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "files": ["dist"]
}
```

Add `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "Node",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Build the package:

```sh
npx -p typescript tsc
```

### Usage

Code example:

```ts
import { type Api, ApiClient } from './sdks/typescript';

const client = new ApiClient({
  token: 'YOUR_TOKEN',
});

const user: Api.GetUserRequest = { id: 'user-123' };

client.getUser(user).then((user) => {
  console.log(user.email);
});
```

## Hey API

[Hey API](https://github.com/hey-api/openapi-ts) is a TypeScript codegen.

### Prerequisites

- [Node 20+](https://nodejs.org/)

### Generate

Generate the TypeScript SDK:

```sh
npx @hey-api/openapi-ts -i ./openapi.yaml -o sdk/src
```

### Build

Go to the SDK folder:

```sh
cd ./sdk/
```

Add `package.json`:

```json
{
  "name": "@your-org/sdk",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "files": ["dist"]
}
```

Add `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "Node",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Build the package:

```sh
npx -p typescript tsc
```

### Usage

Code example:

```ts
import { type GetUserData, getUser } from './sdk';
import { client } from './sdk/dist/client.gen';

client.setConfig({
  baseUrl: 'https://api.example.com',
  auth() {
    return 'YOUR_TOKEN';
  },
});

const user: Pick<GetUserData, 'path'> = { path: { id: 'user-123' } };

getUser(user).then((user) => {
  if (user.error) {
    return console.error(user.error);
  }
  console.log(user.data.email);
});
```

## Kiota

[Kiota](https://github.com/microsoft/kiota) is an open-source generator developed by Microsoft.

### Prerequisites

- [Node 18+](https://nodejs.org/)

### Generate

```sh
npx @kiota-community/kiota-gen generate --openapi ./openapi.yaml --language typescript --output sdk/src
```

### Build

Go to the SDK folder:

```sh
cd ./sdk/
```

Add `package.json`:

```json
{
  "name": "@your-org/sdk",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/apiClient.js",
  "files": ["dist"],
  "dependencies": {
    "@microsoft/kiota-bundle": "1.0.0-preview.99"
  }
}
```

Install the dependencies:

```sh
npm i
```

Add `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "Node",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Build the package:

```sh
npx -p typescript tsc
```

### Usage

Code example:

```ts
import {
  AllowedHostsValidator,
  AuthenticationProvider,
} from '@microsoft/kiota-abstractions';
import { FetchRequestAdapter } from '@microsoft/kiota-http-fetchlibrary';

import { createApiClient } from './sdk';

class StaticAuthProvider implements AuthenticationProvider {
  private readonly allowedHosts = new AllowedHostsValidator(
    new Set(['api.example.com']),
  );

  async authenticateRequest(requestInfo, additionalAuthenticationContext) {
    const url =
      requestInfo?.uri instanceof URL
        ? requestInfo.uri
        : new URL(requestInfo?.uri ?? requestInfo?.url ?? '');

    if (!this.allowedHosts.isUrlHostValid(url)) return;

    requestInfo.headers ??= new Map<string, string>();
    requestInfo.headers.set('Authorization', `Bearer YOUR_ACCESS_TOKEN`);
  }
}

const adapter = new FetchRequestAdapter(new StaticAuthProvider());
adapter.baseUrl = 'https://api.example.com';

const client = createApiClient(adapter);

client.v1.users
  .byId('user-123')
  .get()
  .then((user) => {
    console.log(user.email);
  });
```

## Resources

- [GitHub](https://github.com/remarkablemark/openapi-generator-examples)
