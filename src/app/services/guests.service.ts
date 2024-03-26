import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  public guestsList: Guest[] = [
    {
      name: "geoffrey",
      readleFound: false,
      readler: true,
      position: 6
    },
    {
      name: "yves",
      readleFound: false,
      readler: true,
      position: 3
    },
    {
      name: "matthieu",
      readleFound: false,
      readler: true,
      position: 0
    },
    {
      name: "theo",
      readleFound: false,
      readler: true,
      position: 7
    },
    {
      name: "kevin",
      readleFound: false,
      readler: true,
      position: 2
    },
    {
      name: "godefroi",
      readleFound: false,
      readler: true,
      position: 8
    },
    {
      name: "fred",
      readleFound: false,
      readler: true,
      position: 4
    },
    {
      name: "jacques-louis",
      readleFound: false,
      readler: true,
      position: 1
    },
    {
      name: "romain",
      readleFound: false,
      readler: false,
      position: 5
    },
  ]

  constructor() { }
}
