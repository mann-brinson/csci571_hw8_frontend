import { Component, Input } from '@angular/core';
import { CastItem, CastItemFull } from './castItem';
import { HttpClient } from '@angular/common/http';
// import { CastItemFullService } from './castItemFull.service';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  ngOnChanges() {
    console.log("cast list stuff")
  }

  openCastModal(event: Event) {
    console.log("cast modal")
    let person_id: string = (event.target as Element).id
    console.log({"person_id": person_id})

    this.castItemComponent.open()

    //On click, get the cast modal endpoint, and store result on this instance
    // this.castItemFullService.getCastItemFull(person_id)
    //   .subscribe((data) => {
    //     this.cast_modal_obj = data

    //     console.log({"cast_modal_obj": this.cast_modal_obj})


    // })


  }

}
