export interface History {
  filter?: any[];
  filterData?: FilterData;
  model?: HistoryData[];
}

export interface HistoryData {
  resourceId?: number;
  uploadDate?: string;
  ownerName?: string;
  category?: string;
  language?: string;
  status?: string;
  priority?: string;
  fileUrl?: string;
  assignedTo?: string;
  tags?: string;
  fileName?: string;
}

export interface FilterData {
  assignedTo?: AssignedTo[];
  categories?: Categories[];
  languages?: Languages[];
  statuses?: Status[];
  tags?: Tags[];
}

export interface AssignedTo {
  key?: number;
  value?: string;
}

export interface Categories {
  key?: number;
  value?: string;
}

export interface Languages {
  key?: number;
  value?: string;
}

export interface Tags {
  key?: number;
  value?: string;
}

export interface Status {
  key?: number;
  value?: string;
}
