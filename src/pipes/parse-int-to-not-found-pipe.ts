import {
  ArgumentMetadata,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';

export class ParseIntToNotFoundPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const id = parseInt(value, 10);
    if (isNaN(id)) throw new NotFoundException(`Invalid id provided.`);

    return id;
  }
}
