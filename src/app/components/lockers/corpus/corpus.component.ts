import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SolutionService } from 'src/app/services/solution.service';

@Component({
  selector: 'app-corpus',
  templateUrl: './corpus.component.html',
  styleUrls: ['./corpus.component.scss']
})
export class CorpusComponent  implements OnInit {

  public array = new Array<{imgSrc?: string, rotate: number, rotatable: boolean}[]>();
  public possibleRotate = [0, 90, 180, 270];
  public clue!: string;
  public sqlId!: 'corpus';


  constructor(private _alertController: AlertController, private _solutionService: SolutionService) { }

  ngOnInit() {
    for (let i = 1; i < 5; i++) {
      const line = new Array<{imgSrc?: string, rotate: number, rotatable: boolean}>();
      for (let j = 1; j < 5; j++) {
        const id = (i-1)*4 + j
        const cell = {
          imgSrc: `${id}.png`,
          rotate: this.getRotation(),
          rotatable: [1, 4, 6, 7, 10, 11, 13, 16].includes(id)
        };
        line.push(cell);
      }
      this.array.push(line);
    }
    console.log(this.array);
  }

  public rotate(cell: {imgSrc?: string, rotate: number, rotatable: boolean}): void {
    if (!cell.rotatable) return
    cell.rotate += 90;
    if (cell.rotate === 360) {
      cell.rotate = 0; // Réinitialise la rotation à 0 après un tour complet
    }
  }

  public getRotation(): number {
    const index = Math.floor(Math.random() * this.possibleRotate.length);
    return this.possibleRotate[index];
  }

  public async confirm(): Promise<void> {
    if (this.array.every(line => {
      return line.every(cell => {
        return (cell.rotatable && cell.rotate === 0) || !cell.rotatable
      })
    })) {
      const alert = await this._alertController.create({
        header: this.clue
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
