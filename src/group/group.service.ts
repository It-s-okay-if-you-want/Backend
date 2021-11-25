import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import Ban from 'src/entities/Ban';
import Group from 'src/entities/Group';
import PostLike from 'src/entities/PostLike';
import User from 'src/entities/User';
import { CheckCategory } from 'src/lib/CheckCategory';
import { Repository } from 'typeorm';
import CreateGroupDto from './dto/createGroupDto';
import UpdateGroupDto from './dto/updateGroupDto';

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

  /**
   * @description 같이해요 전체 조회 - 최신순
   */
  public async getGroups(user: User): Promise<Group[]> {
    const userId: User = await this.userService.getUserById(user.id);

    const groups: Group[] = await this.groupRepository.createQueryBuilder('group')
      .leftJoin('group.user', 'user')
      .leftJoinAndSelect('group.comment', 'comment')
      .leftJoinAndSelect('group.postLikes', 'likes')
      .where('user.local = :local', { local: userId.local })
      .orderBy('group.created_at', 'DESC')
      .getMany();

    return groups;
  }

  /**
   * @description 같이해요 특정 조회
   */
  public async getGroup(idx: number): Promise<Group> {
    const group: Group | undefined = await this.groupRepository.findOne({
      where: {
        idx: idx,
      },
      relations: ['postLikes', 'comment']
    });

    if (group === undefined) {
      throw new NotFoundException('존재하지 않는 게시물');
    }

    return group;
  }

  /**
   * @description 같이해요 생성
   */
  public async createGroup(user: User, createGroupDto: CreateGroupDto) {
    const userId: User = await this.userService.getUserById(user.id);

    const isBan: Ban[] = await this.banRepository.createQueryBuilder()
      .where('end_date >= :date', { date: new Date() })
      .getMany();

    if (isBan.length > 0) {
      const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$/;

      if (regex.test(createGroupDto.content)) {
        throw new BadRequestException('이모티콘만 사용할 수 있습니다');
      }
    }

    const newGroup: Group = this.groupRepository.create({
      title: createGroupDto.title,
      content: createGroupDto.content,
      date: createGroupDto.date,
      place: createGroupDto.place,
      image: createGroupDto.image,
    });
    newGroup.user = userId;
    newGroup.category = CheckCategory(createGroupDto.category);

    await this.groupRepository.save(newGroup);
  }

  /**
   * @description 같이해요 수정
   */
  public async updateGroup(idx: number, user: User, updateGroupDto: UpdateGroupDto) {
    const userId: User = await this.userService.getUserById(user.id);

    const group: Group | undefined = await this.groupRepository.findOne({
      idx: idx
    });

    if (group === undefined) {
      throw new NotFoundException('존재하지 않는 게시글');
    }

    if (group.userId !== userId.id) {
      throw new UnauthorizedException('권한이 없습니다');
    }

    this.groupRepository.merge(group, {
      title: updateGroupDto.title,
      content: updateGroupDto.content,
      date: updateGroupDto.date,
      place: updateGroupDto.place,
      image: updateGroupDto.image,
      category: CheckCategory(updateGroupDto.category)
    });

    await this.groupRepository.save(group);
  }

  /**
   * @description 같이해요 삭제
   */
  public async deleteGroup(idx: number, user: User): Promise<void> {
    const userId: User = await this.userService.getUserById(user.id);

    const group: Group | undefined = await this.groupRepository.findOne({
      idx: idx,
    });

    if (group === undefined) {
      throw new NotFoundException('존재하지 않는 게시글');
    }

    if (group.userId !== userId.id) {
      throw new UnauthorizedException('권한이 없습니다');
    }

    await this.groupRepository.remove(group);
  }

  /**
   * @description 같이해요 좋아요
   */
  public async addLike(idx: number, user: User): Promise<void> {
    const userId: User = await this.userService.getUserById(user.id);

    const group: Group = await this.groupRepository.findOne({
      idx: idx
    });

    if (group === undefined) {
      throw new NotFoundException('존재하지 않는 게시글');
    }

    const like: PostLike | undefined = await this.likeRepository.findOne({
      group: group,
      user: userId
    });

    if (like !== undefined) {
      throw new UnauthorizedException('이미 좋아요를 눌렀습니다');
    }

    const newLike: PostLike = this.likeRepository.create();
    newLike.group = group;
    newLike.user = userId;
    await this.likeRepository.save(newLike);

    group.postLike += 1;
    await this.groupRepository.save(group);
  }
}