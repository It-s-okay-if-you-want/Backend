import { ApiProperty } from "@nestjs/swagger";
import Post from "src/entities/Post";
import BaseResponse from "src/lib/BaseResponse";

export class GetPostResponse extends BaseResponse<Post> {

	@ApiProperty()
	data: Post;
}

export class GetPostsResponse extends BaseResponse<Post[]> {

	@ApiProperty({ type: () => [Post] })
	data: Post[];
}