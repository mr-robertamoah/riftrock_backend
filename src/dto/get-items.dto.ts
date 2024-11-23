import { Optional } from '@nestjs/common';

export class GetItemsDTO {
  @Optional()
  page?: number;
  @Optional()
  limit?: number;
}
