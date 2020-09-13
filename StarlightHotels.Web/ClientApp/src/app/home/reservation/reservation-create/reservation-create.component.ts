import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ParticipantModel } from '../../../models/participant.model';
import { ReservationService } from '../../../services/reservation.service';
import { BehaviorSubject } from 'rxjs';
import { HotelService } from '../../../services/hotel.service';
import { SearchHotelModel } from '../../../models/search-hotel.model';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {
  modelArrival: NgbDateStruct;
  modelDeparture: NgbDateStruct;
  minDate: NgbDateStruct;
  nb = [2];

  participantList: ParticipantModel[] = [];
  searchInstance: SearchHotelModel = {} as SearchHotelModel;

  constructor(
    private reservationService: ReservationService,
    private hotelService: HotelService) { }

  ngOnInit(): void {
    let today = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth(), day: today.getDay() };

    this.hotelService.searchData.subscribe(data => this.searchInstance = data);
    this.reservationService.participantData.subscribe(data => this.participantList = data);
  }



  getNbPart(value: number) {

    if (this.participantList.length > value) {
      this.participantList.splice(-1, 1);
    } else if (this.participantList.length < value) {

      for (var _i = this.participantList.length; _i < value; _i++) {
        let participant: ParticipantModel = {} as ParticipantModel;
        this.participantList.push(participant);
      }
      
    }
    return;
  }
}
