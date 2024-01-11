import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  sender: string;
  @ApiProperty()
  text: string;
}
