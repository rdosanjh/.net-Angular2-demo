import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-section-box',
    template: `<div class='wrapper'>
                <ng-content></ng-content>
                </div>`,
    styleUrls: ['./section-box.component.css']
})
export class SectionBoxComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
