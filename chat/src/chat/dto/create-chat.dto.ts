import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty()
  users: string[];
  @ApiProperty()
  admins: string[];
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdBy: string;
}
