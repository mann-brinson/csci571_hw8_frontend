import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CastItemFullService } from './castItem.service';
import { CastItemFull } from 'src/app/components/cast-list/castItem';

//// COMP.CONTENT
@Component({
  selector: 'app-cast-modal-content',
  templateUrl: './cast-modal-content.component.html',
  styleUrls: ['./cast-modal.component.css']
})
export class CastModalContent {
  @Input() cast_item_modal: CastItemFull = {
    person: {
      gender: "",
      profile_path: "",
      birthday: "",
      name: "",
      also_known_as: [],
      known_for: "",
      biography: "",
      externalIds: []
    }
  }

  @Input() name: string = ""
  @Input() profile_path: string = ""

  // gender: string = ""

  constructor(
    public activeModal: NgbActiveModal
  ) { }
}

//// COMP.COMP
@Component({
  selector: 'app-cast-modal',
  templateUrl: './cast-modal.component.html',
  styleUrls: ['./cast-modal.component.css']
})
export class CastModalComponent {

  constructor(
    private modalService: NgbModal,
    private castItemFullService: CastItemFullService
  ) { }

  open(person_id: string) {

    //Initialize a modal object 
    const modalRef = this.modalService.open(CastModalContent)

    //Get castItem for given person_id
    this.castItemFullService.getCastItemFull(person_id)
      .subscribe((data) => {

        //Pass the castItemFull to the modal
        
        modalRef.componentInstance.cast_item_modal = JSON.stringify(data)
        console.log({"data in modal": modalRef.componentInstance.cast_item_modal})

        var castItem = JSON.stringify(data)
        var castItem_person_json = JSON.parse(castItem).person
        
        // console.log({"name test": JSON.parse(castItem).person.name}) //Works
        //Assign individual attributes
        modalRef.componentInstance.name = castItem_person_json.name
        modalRef.componentInstance.profile_path = castItem_person_json.profile_path

      })

    
  }

}
