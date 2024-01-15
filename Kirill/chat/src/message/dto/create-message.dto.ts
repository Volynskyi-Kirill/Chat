import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  chatId: string;
  @ApiProperty()
  text: string;
}
