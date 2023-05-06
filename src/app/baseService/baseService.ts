import { HttpHeaders } from "@angular/common/http";

export class BaseService {

    baseUrl = "http://localhost:8848";

    serviceUrl = '';
    getHeaders() {
        const http = new HttpHeaders();
        if (localStorage.getItem('token')) {
            http.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
        }
        http.set("Content-Type", 'application/json')
        return http;
    }
    getHeadersWithMultipart() {
        const http = new HttpHeaders();
        if (localStorage.getItem('token')) {
            http.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
        }
        http.set("Content-Type", 'multipart/json')
        return http;
    }

}