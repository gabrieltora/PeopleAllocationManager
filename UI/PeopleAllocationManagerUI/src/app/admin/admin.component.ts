import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    constructor() {
        console.log('sunt in admin');

    }

    ngOnInit() {
        console.log('sunt in admin');
    }

}
