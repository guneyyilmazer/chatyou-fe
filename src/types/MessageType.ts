import {seenByUser} from './AllTypes'
export type message = {
    sender:  {
      username:string,
      userId:string,
      profilePicture?:string
    };
    content:  string ;
    pictures?: string[]
    sent:{hour:string,minute:string},
    profilePicture:string,
    seenBy:seenByUser[]
  };
