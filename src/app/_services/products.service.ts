import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/index';
import { Product } from '../_models/index';

@Injectable()
export class ProductsService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getProducts(): Observable<Product[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get products from api
        return this.http.get('/api/products', options)
            .map((response: Response) => {
				return response.json();
			});
    }
}
