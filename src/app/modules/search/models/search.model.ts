export interface Search { }

export interface SearchFormCollection {
  designers?: Designers[];
  categories?: Categories[];
  languages?: Languages[];

}

export interface Designers {
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
