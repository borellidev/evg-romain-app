import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Locker } from 'src/app/models/locker';
import { ScoreComponent } from '../../score/score.component';
import { NumericComponent } from '../numeric/numeric.component';
import { SimonComponent } from '../simon/simon.component';
import { LitteralComponent } from '../litteral/litteral.component';
import { SolutionService } from 'src/app/services/solution.service';
import { CorpusComponent } from '../corpus/corpus.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent  implements OnInit {

  public title!: string;
  public lokers!: Locker<any>[];

  constructor(private _modalController: ModalController, private _alertController: AlertController, private _solutionService: SolutionService) { }

  ngOnInit() {
    this.title = 'Verrous';
    this.lokers = [
      {
        label: '₰',
        component: LitteralComponent,
        data: {
          response: "secret",
          clue: "En haut de la mairie, le motif sera révélé",
          sqlId: 'symbole_1',
          label: '₰'
        }
      },
      {
        label: 'corpus',
        component: CorpusComponent,
        data: {
          sqlId: 'corpus',
          clue: `Geo et Théo ont seulement un litre d’écart | 
          Fred a bu plus d’alcool que Godefroi et que Romain | 
          Kevin a bu 1 litre d’alcool de moins que Jacques-Louis`
        }
      },
      {
        label: 'Verrou 1',
        component: LitteralComponent,
        data: {
          response: "vila vella",
          sqlId: 'chaine_1',
          label: 'Mot de passe'
        }
      },
      {
        label: 'Verrou 2',
        component: NumericComponent,
        data: {
          sqlId: 'chaine_2'
        }
      },
    ]
  }

  public async openModal(locker: Locker<any>): Promise<void> {
    const modal = await this._modalController.create({
      component: locker.component,
      initialBreakpoint: 1,
      componentProps: locker.data
    });
    await modal.present();
  }

  public async getSolution(): Promise<void> {
    const resultats = this._solutionService.resultats;
    if (resultats.every(res => res.state)) {
      const alert = await this._alertController.create({
        header: "Demande à Geoffrey ton dernier indice. Dis lui : Supercalifragilisticexpialidocious"
      });
      alert.present();
    } else {
      const alert = await this._alertController.create({
        header: "accès refusé"
      });
      alert.present();
    }
  }

  public getLockerState(locker: Locker<any>): boolean {
    return this._solutionService.resultats?.find(res => res.id === locker.data.sqlId)!.state
  }

  public getAllLockerState(): boolean {
    return this._solutionService.resultats?.every(res => res.state);
  }
}
