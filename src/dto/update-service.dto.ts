export class UpdateServiceDTO {
  name: string | null;
  description: string | null;
  details: string | null;
  file: File | null;
  fileDescription: string | null;
  serviceId: number;
}
