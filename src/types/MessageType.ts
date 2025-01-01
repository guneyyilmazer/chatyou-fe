import {seenByUser} from './AllTypes'
export type message = {
    sender:  {
      username:string,
      userId:string
    };
    content:  string ;
    pictures?: string[]
    sent:{hour:string,minute:string},
    profilePicture:string,
    seenBy:seenByUser[]
  };
