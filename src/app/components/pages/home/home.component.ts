import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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

  faSearch = faSearch;
  placeholder = 'Search for a moment...'

  searchText = '';

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

  handleSearch() {
    this.filteredMoments = this.allMoments.filter((moment) => {
      return moment.title.toUpperCase().includes(this.searchText.toUpperCase());
    })

  }
}
