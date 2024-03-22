import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://localhost:3000/'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  getURL(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}`);
  }
  shortenURL(url: string, short: string, ): Observable<any> {
      const endpoint = this.BASE_URL + 'api/v1'; // Construction de l'URL complète pour la route de raccourcissement d'URL
      const requestBody = {
        url: url,
        short: short,

      };
      console.log(requestBody, 'requestBody');

      return this.http.post<any>(endpoint, requestBody);
  }

  getURLCount(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}`);
  }

  resolveURL(short: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}${short}`);
  }


}
