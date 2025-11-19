import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsDateString()
  reminderTime: string;
}

export class UpdateReminderDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;

  @IsOptional()
  @IsDateString()
  reminderTime?: string;

  @IsOptional()
  notified?: boolean;
}
