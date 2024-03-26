import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SolutionService } from 'src/app/services/solution.service';

@Component({
  selector: 'app-litteral',
  templateUrl: './litteral.component.html',
  styleUrls: ['./litteral.component.scss'],
})
export class LitteralComponent  implements OnInit {

  public value!: string;
  public response!: string;
  public clue!: string;
  public display: string = "";
  public sqlId!: 'symbole_1' | 'chaine_1';
  public label!: string;

  constructor(private _alertController: AlertController, private _solutionService: SolutionService) { }

  ngOnInit() {
    this.response.split("").forEach(char => {
      this.display += char !== " " ? "-" : char;
    })
  }

  public async confirm(): Promise<void> {
    if (this.value.toLowerCase() === this.response.toLowerCase()) {
      const alert = await this._alertController.create({
        header: this.clue ?? "c'est gagné !"
      });
      alert.present();
      this._solutionService.validateLocker(this.sqlId);
    } else {
      const alert = await this._alertController.create({
        header: 'Accès refusé'
      });
      alert.present();
    }
  }

  public setDisplay(): void {
    this.display = "";
    this.response.split("").forEach(char => {
      this.display += char !== " " ? "-" : char;
    })
    const end = this.display.slice(this.value.length);
    this.display = this.value + end;
  }

}
