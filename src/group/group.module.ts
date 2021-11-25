import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import Ban from 'src/entities/Ban';
import Group from 'src/entities/Group';
import PostLike from 'src/entities/PostLike';
import User from 'src/entities/User';
import { TokenService } from 'src/token/token.service';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, PostLike, Ban])],
  providers: [GroupService, TokenService, AuthService],
  controllers: [GroupController],
  exports: [GroupModule]
})
export class GroupModule { }
