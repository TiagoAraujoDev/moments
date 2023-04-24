import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Moment } from 'src/app/moment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private momentApiUrl = `${this.baseApiUrl}/moments`;

  constructor(private httpClient: HttpClient) { }

  createMoment(formData: FormData): Observable<FormData> {
    return this.httpClient.post<FormData>(this.momentApiUrl, formData);
  }
}
