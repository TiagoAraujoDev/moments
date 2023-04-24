import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/moment';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  baseApiUrl = environment.baseApiUrl;
  allMoments: Moment[] = [];
  filteredMoments: Moment[] = [];

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((resp) => {
      const data = resp.data;

      data.map((moment) => {
        moment.created_at = new Date(moment.created_at!).toLocaleDateString(
          'en-us'
        );
      });

      this.allMoments = data;
      this.filteredMoments = data;
    });
  }
}
