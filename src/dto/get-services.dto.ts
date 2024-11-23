import { Optional } from '@nestjs/common';

export class GetServicesDTO {
  @Optional()
  page?: number;
  @Optional()
  limit?: number;
}
