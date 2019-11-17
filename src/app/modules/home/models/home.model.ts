export interface Home { }

export interface UploadImage {
  name?: string;
  imgData?: any;
}

export interface UploadInfo {
  fileName: string;
  description?: string;
  languageId?: number;
  categoryId: number;
  tags?: number[];
  priority?: number;
  status?: string;
  mainFileStorageId: string;
  referenceFiles: string[];
  remark?: string;
  qAs?: number[];
}

export interface UploadFormCollection {
  categories?: Categories[];
  languages?: Languages[];
  priorities?: Priorities[];
  tags?: Tags[];
  qAs?: QAs[];
}

export interface Categories {
  key?: number;
  value?: string;
}

export interface Languages {
  key?: number;
  value?: string;
}

export interface Priorities {
  key?: number;
  value?: string;
}

export interface Tags {
  key?: number;
  value?: string;
}

export interface QAs {
  key?: number;
  value?: string;
}
