import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoxLocalToolsService {
  private baseUrl = 'http://localhost:3000'; // Node.js server URL

  constructor(private http: HttpClient) {}

  callServer(code: string, fileId: string) {
    const params = { code, fileid: fileId };
    return this.http.get(`${this.baseUrl}`, { params });
  }
}
