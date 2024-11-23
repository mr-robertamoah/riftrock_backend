declare namespace Express {
  export interface Request {
    file?: Multer.file;
    files?: Multer.file[];
  }
}
