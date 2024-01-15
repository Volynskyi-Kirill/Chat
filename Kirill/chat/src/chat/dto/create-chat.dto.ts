import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty()
  users: string[];
  @ApiProperty()
  name: string;
}
