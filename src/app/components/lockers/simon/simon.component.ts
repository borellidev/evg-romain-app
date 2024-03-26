import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-simon',
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.scss'],
})
export class SimonComponent  implements OnInit {

  public availableColors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'maroon',
    'pink',
    'gray',
    'cyan'
  ];
  public resultats = new Array<string>();
  public inputs = new Array<string>();
  public toShow = new Array<string>();
  public step = 1;
  public overflowStep = 10;
  public readonly setTime = 15;
  public timer = this.setTime;
  public decrementTimer!: NodeJS.Timeout;
  constructor(private _alertController: AlertController) { }

  ngOnInit() {
    this.resultats = this.createRandomArray(this.availableColors, 9);
    this.restart();
  }

  private createRandomArray(colors: string[], length: number): string[] {
    const randomArray: string[] = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      randomArray.push(colors[randomIndex]);
    }
    return randomArray;
  }

  public async newInput(color: string): Promise<void> {
    this.inputs.push(color);
    const index = this.inputs.length - 1;
    if (this.inputs[index] !== this.resultats[index]) {
      clearInterval(this.decrementTimer);
      await this.setFailure();
    } else {
      if (this.inputs.length === this.step) {
        clearInterval(this.decrementTimer);
        this.step++;
        this.inputs = new Array<string>();
        this.timer = this.setTime;
        const alert = await this._alertController.create({
          header: "Etape franchie !",
          subHeader: "Continue !"
        });
        alert.present();
        await alert.onDidDismiss();
        this.restart();
      }
      if (this.step === this.overflowStep) {
        clearInterval(this.decrementTimer);
        const alert = await this._alertController.create({
          header: "C'est gagné !!"
        });
        alert.present();
      }
    }
  }

  public async setFailure(): Promise<void> {
    const alert = await this._alertController.create({
      header: "Echec !!",
      subHeader: "Recommence !"
    });
    alert.present();
    this.step = 1;
    this.inputs = new Array<string>();
    this.timer = this.setTime;
    await alert.onDidDismiss();
    this.restart();
  }

  public restart(): void {
    this.toShow = this.resultats.slice(0, this.step);
    setTimeout(() => {
      this.toShow = new Array<string>();
    }, 5000);
    this.decrementTimer = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.setFailure();
        clearInterval(this.decrementTimer);
      }
    }, 1000)
  }
  public close(): void {
    clearInterval(this.decrementTimer);
  }

}
