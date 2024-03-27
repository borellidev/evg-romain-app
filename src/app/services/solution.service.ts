import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  private store = new Storage();
  private sqlResultats = 'resultats'
  public resultats!: {id: string, state: boolean}[];

  constructor() {
    this.getResultats();
  }

  public async getResultats(): Promise<void> {
    await this.store.create();
    this.resultats = await this.store.get(this.sqlResultats);
    if (!this.resultats) {
      this.resultats = [
        {
        id: 'symbole_1',
        state: false
        },
        {
          id: 'corpus',
          state: false
        },
        {
          id: 'chaine_1',
          state: false
        },
        {
          id: 'chaine_2',
          state: false
        },                
      ]
      this.store.set(this.sqlResultats, this.resultats);
    }
  }

  public async validateLocker(id: 'symbole_1' | 'corpus' | 'chaine_1' | 'chaine_2'): Promise<void> {
    this.resultats.find(res => res.id === id)!.state = true;
    this.store.set(this.sqlResultats, this.resultats);
  }
}
