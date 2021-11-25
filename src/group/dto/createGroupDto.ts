import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class CreateGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  place!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  category!: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;
}