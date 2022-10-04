import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { History } from '../../../models/history'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  histories:History[] = [];

  constructor(private historyService:HistoryService) { 
    this.historyService.getAllHistories().subscribe((response) =>{
      this.histories = response.result;

      console.log("Histories : ",this.histories);
      
    },
    (error) =>{
      console.log("error in history ",error);
      
    });
  }

  ngOnInit(): void {
  }

}
