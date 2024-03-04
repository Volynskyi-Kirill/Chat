import { ApiProperty } from '@nestjs/swagger';

export class ChatUserDto {
  @ApiProperty()
  chatId: string;
  @ApiProperty()
  userId: string;
}
