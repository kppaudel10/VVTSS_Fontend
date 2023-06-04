import {HttpHeaders} from "@angular/common/http";

export class BaseService {

    baseUrl = "http://localhost:8848";
  //baseUrl = "http://10.121.5.11:8848";

  serviceUrl = '';

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getHeadersToFetchImage() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept':'image/jpeg',
        'responseType':'blob'
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
