import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class DelayedMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  chatId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @IsDate()
  @IsNotEmpty()
  timeToSend: Date;
}
