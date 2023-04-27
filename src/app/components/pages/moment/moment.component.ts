import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';

import { Moment } from 'src/app/moment';
import { Comment } from 'src/app/comment';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  baseApiUrl = environment.baseApiUrl;
  moment?: Moment;

  commentForm!: FormGroup;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService,
    private commentService: CommentService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((resp) => (this.moment = resp.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  handleRemoveMoment(id: number) {
    this.momentService.removeMoment(id).subscribe();
    this.messagesService.addMessage('Moment deleted successfully!');
    this.router.navigate(['/']);
  }

  handleSubmitComment(formDir: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }
    const commentData: Comment = this.commentForm.value;
    const momentId = this.moment!.id!;
    this.commentService
      .createComment(commentData, momentId)
      .subscribe((resp) => {
        const comment = resp.data;
        this.moment?.comments?.push(comment);

        this.messagesService.addMessage('Comment added!');

        this.commentForm.reset();
        formDir.resetForm();
      });
  }
}
