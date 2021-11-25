import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdateGroupDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  date!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  place!: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  category!: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;
}