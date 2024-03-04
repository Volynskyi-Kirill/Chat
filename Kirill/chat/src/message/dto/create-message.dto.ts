import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class CreateMessageDto {
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

  @IsOptional()
  @IsDate()
  timeToSend?: Date;
}
