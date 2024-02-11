import { ExecutionContext } from '@nestjs/common';

export function getMockContext() {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        user: {},
        params: {},
      }),
      getResponse: jest.fn(),
      getNext: jest.fn(),
    }),
    getHandler: jest.fn(),
    getClass: jest.fn(),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn(),
  } as ExecutionContext;
}

// const mockContext = {
//   switchToHttp: () => ({
//     getRequest: () => ({
//       user: {},
//       params: {},
//     }),
//     getResponse: jest.fn(),
//     getNext: jest.fn(),
//   }),
//   getHandler: jest.fn(),
//   getClass: jest.fn(),
//   getArgs: jest.fn(),
//   getArgByIndex: jest.fn(),
//   switchToRpc: jest.fn(),
//   switchToWs: jest.fn(),
//   getType: jest.fn(),
// } as ExecutionContext;
