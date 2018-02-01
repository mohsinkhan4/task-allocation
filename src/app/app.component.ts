import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material';
import { ModalComponent } from './utils/modal/modal.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { fadeAnimation } from './utils/animations/fade.animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    // animations: [fadeAnimation]
    /* animations: [ 
        trigger('routerTransition', [
            state('normal', style({
                'background-color': 'skyblue'
            })),
            state('highlighted', style({
                'background-color': 'lightgreen'
            })),
            transition(
                'normal <=> highlighted', [
                    style({
                        'border-radius': '0px'
                    }),
                    animate(2000, style({
                        'border-radius': '50px'
                    })),
                    animate(2000)
                ]
            )
        ])
    ] */
})
export class AppComponent {
    
    title = 'app';
    // appState = 'highlighted';

    getRouterOutletState(outlet) {
        // console.log(outlet)
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
    
    /* getState(o) {
        console.log(o.activatedRouteData);
        return this.appState;
    }

    changeState() {
        this.appState = (this.appState === 'normal') ? 'highlighted' : 'normal';
    } */

}
