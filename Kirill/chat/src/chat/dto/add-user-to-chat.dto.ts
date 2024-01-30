import { ApiProperty } from '@nestjs/swagger';

export class AddUserToChatDto {
  @ApiProperty()
  chatId: string;
  @ApiProperty()
  userId: string;
}
