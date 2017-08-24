import * as tmp from 'tmp';

export interface ICreatedFileResult {
  path: string;
  fd: number;
  cleanupCallback: () => void;
}

export interface ICreatedDirectoryResult {
  path: string;
  cleanupCallback: () => void;
}

export const fileSync = tmp.fileSync;
export function file(options?: tmp.Options) {
  return new Promise<ICreatedFileResult>((resolve, reject) => {
    function callback(
        error: any, path: string, fd: number, cleanupCallback: () => void) {
      if (error) {
        reject(error);
        return;
      }

      resolve({
        path, fd, cleanupCallback
      });
    };

    if (options) {
      tmp.file(options, callback);
    } else {
      tmp.file(callback);
    }
  });
}

export const dirSync = tmp.dirSync;
export function dir(options?: tmp.Options) {
  return new Promise<ICreatedDirectoryResult>((resolve, reject) => {
    function callback(error: any, path: string, cleanupCallback: () => void) {
      if (error) {
        reject(error);
        return;
      }

      resolve({
        path, cleanupCallback
      });
    };

    if (options) {
      tmp.dir(options, callback);
    } else {
      tmp.dir(callback);
    }
  });
}

export const tmpNameSync = tmp.tmpNameSync;
export function tmpName(options?: tmp.SimpleOptions) {
  return new Promise<string>((resolve, reject) => {
    function callback (error: any, path: string) {
      if (error) {
        reject(error);
        return;
      }

      resolve(path);
    };

    if (options) {
      tmp.tmpName(options, callback);
    } else {
      tmp.tmpName(callback);
    }
  });
}
