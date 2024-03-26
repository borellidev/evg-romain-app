import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ScoreComponent } from './score/score.component';
import { ManagerComponent } from './lockers/manager/manager.component';
import { LockerHeaderComponent } from './lockers/locker-header/locker-header.component';
import { NumericComponent } from './lockers/numeric/numeric.component';
import { SimonComponent } from './lockers/simon/simon.component';
import { LitteralComponent } from './lockers/litteral/litteral.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderedListComponent } from './lockers/ordered-list/ordered-list.component';
import { CorpusComponent } from './lockers/corpus/corpus.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ScoreComponent,
    ManagerComponent,
    LockerHeaderComponent,
    NumericComponent,
    SimonComponent,
    LitteralComponent,
    OrderedListComponent,
    CorpusComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent, 
    ScoreComponent,
    ManagerComponent,
    LockerHeaderComponent,
    NumericComponent,
    SimonComponent,
    LitteralComponent,
    OrderedListComponent,
    CorpusComponent
  ]
})
export class ComponentsModule { }
