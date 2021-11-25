import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

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
  @IsDate()
  date!: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  place!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image?: string;
}