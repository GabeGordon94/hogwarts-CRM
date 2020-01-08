import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassListService {
  public classList: object[];
  constructor() { }
}
