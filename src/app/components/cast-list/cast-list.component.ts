import { Component, Input } from '@angular/core';
import { CastItem, CastItemFull } from './castItem';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CastModalComponent, CastModalContent } from 'src/app/components/cast-modal/cast-modal.component';
import { CastItemFullService } from 'src/app/components/cast-modal/castItem.service';

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

  ngOnChanges() {
    console.log("cast list stuff")
  }

  openCastModal(event: Event) {
    console.log("cast modal")
    let person_id: string = (event.target as Element).id
    console.log({"person_id": person_id})

    //Get the person_id details, then pass and render inside a pop-up modal
    this.castItemComponent.open(person_id)


  }

}
