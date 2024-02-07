import { ExecutionContext } from '@nestjs/common';

export function createMockContext(
  userId: string,
  chatId: string,
): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        user: { userId },
        params: { chatId },
        body: { chatId },
      }),
    }),
    getHandler: jest.fn(),
  };
}

// const mockContext = {
// 	switchToHttp: () => ({
// 	  getRequest: () => ({
// 		user: { userId: 'userId' },
// 		params: { chatId: 'chatId' },
// 		body: { chatId: 'chatId' },
// 	  }),
// 	}),
// 	getHandler: jest.fn(),
//   };
