import { ApiProperty } from '@nestjs/swagger';

export class LoginReponse {
  @ApiProperty({
    example: 'example',
  })
  accessToken!: string;
}
