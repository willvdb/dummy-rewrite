import { Component, OnInit } from '@angular/core';

import { Product } from '../../_models/index';
import { ProductsService } from '../../_services/index';

@Component({
	selector: 'products',
    templateUrl: 'products.component.html',
})

export class ProductsComponent implements OnInit {
    products: Product[] = [];

    constructor(private productsService: ProductsService) { }

    ngOnInit() {
        // get users from secure api end point
        this.productsService.getProducts()
            .subscribe((products) => {
                this.products = products;
            });
    }

}
