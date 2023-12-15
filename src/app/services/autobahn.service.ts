import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutobahnService {
  private apiUrl = 'https://verkehr.autobahn.de/o/autobahn';

  constructor(private http: HttpClient) { }

  getHighways(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }

  getRoadworks(roadId: string) {
    return this.http.get<any>(`${this.apiUrl}/${roadId}/services/roadworks`);
  }
  
  getRoadworkDetail(roadworkId: string) {
    return this.http.get<any>(`${this.apiUrl}/details/roadworks/${roadworkId}`);
  }
}
