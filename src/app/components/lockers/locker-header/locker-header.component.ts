import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-locker-header',
  templateUrl: './locker-header.component.html',
  styleUrls: ['./locker-header.component.scss'],
})
export class LockerHeaderComponent {

  @Input() label!: string;
  @Output() closed = new EventEmitter<void>();

  constructor(private _modalController: ModalController) { }

  public async close(): Promise<void> {
    this.closed.emit();
    await this._modalController.dismiss();
  }
}
