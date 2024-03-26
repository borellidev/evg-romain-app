import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { OrderedListComponent } from '../ordered-list/ordered-list.component';

@Component({
  selector: 'app-numeric',
  templateUrl: './numeric.component.html',
  styleUrls: ['./numeric.component.scss'],
})
export class NumericComponent  implements OnInit {

  public values!: number[];
  public readonly resultats = [0,1,0,5]
  public sqlId!: 'chaine_2'

  constructor(private _modalController: ModalController) { }

  ngOnInit() {
    this.reset();
  }

  public reset(): void {
    this.values = [0, 0, 0, 0];
  }

  public setValue(index: number, delta: number): void {
    this.values[index] = (this.values[index] + delta >= 0 && this.values[index] + delta <= 9) ? this.values[index] + delta : this.values[index];
  }

  public async verify(): Promise<void> {
    if (this.values.every((value, index) => {
      return value == this.resultats[index];
    })) {
      const modal = await this._modalController.create({
        component: OrderedListComponent,
        initialBreakpoint: 1,
        componentProps: {
          sqlId: this.sqlId
        }
      });
      modal.present();
    }
  }

}
