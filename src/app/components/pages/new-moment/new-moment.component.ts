import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Moment } from 'src/app/moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  buttonText: string = 'Share';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) { }

  async createMomentHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    this.momentService.createMoment(formData).subscribe();
    this.messagesService.addMessage('Moment added!');
    this.router.navigate(['/']);
  }
}
