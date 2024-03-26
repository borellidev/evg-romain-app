import { Guest } from './../../../models/guest';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GuestsService } from 'src/app/services/guests.service';
import { SolutionService } from 'src/app/services/solution.service';

@Component({
  selector: 'app-ordered-list',
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.scss'],
})
export class OrderedListComponent  implements OnInit {

  public guestsList!: Guest[];
  public sqlId!: 'chaine_2'

  constructor(private _guestService: GuestsService, private _alertController: AlertController, private _solutionService: SolutionService) { }

  ngOnInit() {
    this.guestsList = this._guestService.guestsList;
  }

  public handleReorder(ev: CustomEvent<any>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    // console.log(ev)
    // console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    this.guestsList = ev.detail.complete(this.guestsList);
    // console.log(this.listItem);
  }

  public async confirm(): Promise<void> {
    if (this.guestsList.every((guest: Guest, index: number) => {
      return guest.position === index
    })) {
      const alert = await this._alertController.create({
        header: "c'est gagné !"
      });
      alert.present();
      this._solutionService.validateLocker(this.sqlId);
    } else {
      const alert = await this._alertController.create({
        header: "accès refusé"
      });
      alert.present();
    }
  }

}
