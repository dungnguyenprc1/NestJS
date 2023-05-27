import { ApiProperty } from '@nestjs/swagger';

export class GetAccessTokenReponse {
  @ApiProperty({
    example: 'example',
  })
  accessToken: string;
}
