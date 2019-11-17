import { Action } from '@ngrx/store';
import { Inbox } from '../../models/inbox.model';

export enum InboxActionTypes {
  LoadInboxAction = '[Inbox] Load Inbox Action',
  LoadInboxSuccessAction = '[Inbox] Load Inbox Action (success)',
  DeleteInboxAction = '[Inbox] Delete Inbox Action',
}

export class LoadInbox implements Action {
  readonly type = InboxActionTypes.LoadInboxAction;
  constructor(public payload: any) {}
}

export class LoadInboxSuccess implements Action {
  readonly type = InboxActionTypes.LoadInboxSuccessAction;

  constructor(public payload: Inbox) { }
}

export class DeleteInbox implements Action {
  readonly type = InboxActionTypes.DeleteInboxAction;
  constructor(public payload: any) {}
}


export type InboxActions = LoadInbox | LoadInboxSuccess | DeleteInbox;
