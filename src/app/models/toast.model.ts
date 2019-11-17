export interface ToastMessage {
  //for message
  severity: string;
  summary: string;
  detail: string;
  //for primeng toast config
  key?: string;
  style?: string;
  styleClass?: string;
  position?: string;
  modal?: boolean;
  baseZIndex?: number;
  autoZIndex?: boolean;
  showTransitionOptions?: string;
  hideTransitionOptions?: string;
}
