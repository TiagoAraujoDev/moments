import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";

import { MomentService } from 'src/app/services/moment.service';
import { environment } from "src/environments/environment";

import { Moment } from 'src/app/moment';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  baseApiUrl = environment.baseApiUrl;
  moment?: Moment;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((resp) => (this.moment = resp.data));
  }

  handleRemoveMoment(id: number) {
    this.momentService.removeMoment(id).subscribe();
    this.messagesService.addMessage("Moment deleted successfully!");
    this.router.navigate(['/']);
  }
}
