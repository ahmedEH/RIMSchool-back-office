import { Injectable } from '@angular/core';
import { Cycle } from '../models/cycle';
import { Faculty } from '../models/faculty';
import { Level } from '../models/level';
import { Matter } from '../models/matter';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  cycle:Cycle | undefined;
  faculty:Faculty | undefined;
  level:Level | undefined;
  matter:Matter | undefined;
  

  constructor() { }
}
