import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import Ban from 'src/entities/Ban';
import Group from 'src/entities/Group';
import PostLike from 'src/entities/PostLike';
import { Repository } from 'typeorm';
import CreateGroupDto from './dto/createGroupDto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private userService: AuthService,
    @InjectRepository(PostLike)
    private likeRepository: Repository<PostLike>,
    @InjectRepository(Ban)
    private banRepository: Repository<Ban>,
  ) { }

  public async createGroup(createGroupDto: CreateGroupDto) {

  }
}
