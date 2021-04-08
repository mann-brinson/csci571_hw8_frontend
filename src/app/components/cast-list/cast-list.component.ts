import { Component, Input } from '@angular/core';
import { CastItem } from './castItem';
import { HttpClient } from '@angular/common/http';
import { CastModalComponent } from 'src/app/components/cast-modal/cast-modal.component';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.css']
})
export class CastListComponent {

  @Input() cast_list: Array<CastItem> = []

  public cast_modal_obj: object = {}

  constructor(
    private http: HttpClient,
    private castItemComponent: CastModalComponent
    ) { }

  openCastModal(event: Event) {
    let person_id: string = (event.target as Element).id

    //Get the person_id details, then pass and render inside a pop-up modal
    this.castItemComponent.open(person_id)
  }

}
