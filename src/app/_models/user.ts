import { Photo } from './photo';

export interface User {
  id: number;
  username: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
}
//the optional properties(the one with ? elvis operator xD) always comes last after requiered ones
//here there are 4 of them beacuse those are used for UserForDetailedDto
//the obligatory ones are for UserForListDto, so there is one model but with optional properties
