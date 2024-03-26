import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FriendChallenge } from 'src/app/models/friend-challenge';
import { LoadingController } from '@ionic/angular';
import { Guest } from 'src/app/models/guest';
import { GuestsService } from 'src/app/services/guests.service';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent  implements OnInit {

  public friendsChallengeList!: Guest[]
  private store = new Storage();
  private sqlFriendsChallengeList = 'friendsChallengeList'

  constructor(private _loadingCtrl: LoadingController, private _guestService: GuestsService) { }

  async ngOnInit() {
    await this.store.create();
    this.friendsChallengeList = await this.store.get(this.sqlFriendsChallengeList);
    if (!this.friendsChallengeList) {
      await this.store.set(this.sqlFriendsChallengeList, this._guestService.guestsList);
    } else {
      this._guestService.guestsList = this.friendsChallengeList;
    }
    this.friendsChallengeList = await this.store.get(this.sqlFriendsChallengeList);
    this.friendsChallengeList = this.friendsChallengeList.filter(elem => elem.readler);
  }

  public getAchivedChallenges(): number {
    return this.friendsChallengeList.filter(fc => fc.readleFound).length;
  }

  public async setFcState(fc: Guest, readleFound: boolean): Promise<void> {
    fc.readleFound = readleFound;
    const loading = await this._loadingCtrl.create({
      message: 'Enregistrement...',
    });
    loading.present();
    await this.store.set(this.sqlFriendsChallengeList, this.friendsChallengeList);
    loading.dismiss();
    
  }

}
