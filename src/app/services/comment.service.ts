import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment } from 'src/app/comment';
import { Response } from 'src/app/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  createComment(data: Comment, momentId: number): Observable<Response<Comment>> {
    const url = `${this.baseApiUrl}/api/moments/${momentId}/comments`
    return this.httpClient.post<Response<Comment>>(url, data);
  }
}
