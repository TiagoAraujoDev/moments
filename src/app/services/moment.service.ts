import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Moment } from 'src/app/moment';
import { Response } from 'src/app/response';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private momentApiUrl = `${this.baseApiUrl}/api/moments`;

  constructor(private httpClient: HttpClient) { }

  getMoments(): Observable<Response<Moment[]>> {
    return this.httpClient.get<Response<Moment[]>>(this.momentApiUrl);
  }

  getMoment(id: number): Observable<Response<Moment>> {
    const url = `${this.momentApiUrl}/${id}`
    return this.httpClient.get<Response<Moment>>(url);
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.httpClient.post<FormData>(this.momentApiUrl, formData);
  }

  removeMoment(id: number) {
    const url = `${this.momentApiUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
