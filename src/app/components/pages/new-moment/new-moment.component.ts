import { Component } from '@angular/core';

import { Moment } from 'src/app/moment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  buttonText: string = 'Share';

  constructor(private momentService: MomentService) { }

  async createMomentHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    //  Send data to service
    this.momentService.createMoment(formData).subscribe();

    //  TODO:
    //  Show message
    //  Redirect
  }
}
