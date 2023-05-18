import {HttpHeaders} from "@angular/common/http";

export class BaseService {

  baseUrl = "http://localhost:8848";

  serviceUrl = '';

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getHeadersWithMultipart() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

}
