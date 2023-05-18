import { HttpHeaders } from "@angular/common/http";

export class BaseService {

    baseUrl = "http://localhost:8848";

    serviceUrl = '';
    getHeaders() {
        const token  = localStorage.getItem('token');
        console.log('ranmatiToken',token);

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });

        return headers;
    }

    getHeadersWithMultipart() {
        const http = new HttpHeaders();
        const token  = localStorage.getItem('token');

        if (token != null) {
            http.set('Authorization', `Bearer ${token}`)
        }
        http.set("Content-Type", 'multipart/json')
        return http;

    }
    
}
