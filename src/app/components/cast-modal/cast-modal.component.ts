import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CastItemFullService } from './castItem.service';
import { faFacebookSquare, faTwitter, faImdb, faInstagram } from '@fortawesome/free-brands-svg-icons';

//// COMP.CONTENT
@Component({
  selector: 'app-cast-modal-content',
  templateUrl: './cast-modal-content.component.html',
  styleUrls: ['./cast-modal.component.css']
})
export class CastModalContent {
  public name: string = ""
  public profile_path: string = ""
  public birthdate: string = ""
  public birthplace: string = ""
  public gender: string = ""
  public known_for: string = ""
  public also_known_as: string = ""
  public biography: string = ""

  /// EXTERNAL IDS
  public imdb_page: string = ""
  public insta_page: string = ""
  public fb_page: string = ""
  public twitter_page: string = ""

  public imdb_square = faImdb
  public insta_square = faInstagram
  public fb_square = faFacebookSquare
  public twitter_square = faTwitter

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
    //Get castItem for given person_id
    this.castItemFullService.getCastItemFull(person_id)
      .subscribe((data) => {

        //Pass the castItemFull to the modal
        var castItem = JSON.stringify(data)
        var castItem_person_json = JSON.parse(castItem).person
        var castItem_eIds_json = JSON.parse(castItem).externalIds

        //Initialize a modal object 
        const modalRef = this.modalService.open(CastModalContent, {'size': 'lg'})

        modalRef.componentInstance.cast_item_modal = JSON.stringify(data)
        console.log({"data in modal": modalRef.componentInstance.cast_item_modal})
        
        //Assign individual attributes
        modalRef.componentInstance.name = castItem_person_json.name
        modalRef.componentInstance.profile_path = castItem_person_json.profile_path
        modalRef.componentInstance.birthdate = castItem_person_json.birthday
        modalRef.componentInstance.birthplace = castItem_person_json.birthplace
        modalRef.componentInstance.gender = castItem_person_json.gender
        modalRef.componentInstance.known_for = castItem_person_json.known_for
        modalRef.componentInstance.also_known_as = castItem_person_json.also_known_as.join(', ')

        // External IDs
        if ("imdb_id" in castItem_eIds_json) {
          modalRef.componentInstance.imdb_page = castItem_eIds_json.imdb_id
        }
        if ("instagram_id" in castItem_eIds_json) {
          modalRef.componentInstance.insta_page = castItem_eIds_json.instagram_id
        }
        if ("facebook_id" in castItem_eIds_json) {
          modalRef.componentInstance.fb_page = castItem_eIds_json.facebook_id
        }
        if ("twitter_id" in castItem_eIds_json) {
          modalRef.componentInstance.twitter_page = castItem_eIds_json.twitter_id
        }

        //Biography
        modalRef.componentInstance.biography = castItem_person_json.biography
      })

  }
}
