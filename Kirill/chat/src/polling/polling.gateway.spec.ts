import { Test } from '@nestjs/testing';
import { PollingGateway } from './polling.gateway';
import { PollingService } from './polling.service';
import { Socket, io } from 'socket.io-client';
import { RedisModule } from '../modules/redis.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MESSAGE_EVENTS } from 'chat-utils';

describe('PollingGateway', () => {
  let gateway: PollingGateway;
  let app: INestApplication;
  let ioClient: Socket;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [RedisModule, ConfigModule.forRoot()],
      providers: [PollingGateway, PollingService],
    }).compile();

    gateway = testingModule.get<PollingGateway>(PollingGateway);

    ioClient = io('ws://localhost:3001', {
      autoConnect: false,
      transports: ['websocket'],
      auth: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTlmZmMwNDNlODliMDllZTRmYTI0MmYiLCJ1c2VybmFtZSI6InRlc3QifQ.PSBMbM4Fs93GtB6Wkdy95wZaRXiSf01wcNwvp0tZSDQ',
      },
    });

    app = await testingModule.createNestApplication();
    app.listen(3001);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should emit -pong', async () => {
    ioClient.connect();

    await new Promise<void>((resolve) => {
      ioClient.on('connect', () => {
        ioClient.emit(MESSAGE_EVENTS.PING);
      });
      ioClient.on('pong', (data) => {
        expect(data).toBe('pong data');
        resolve();
      });
    });
    ioClient.disconnect();
  });
});
