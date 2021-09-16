import { Component } from "@angular/core";

@Component({
    selector: 'app-loading-spinner',
    template: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
    styleUrls: ['./loading-spinner.scss']
})
export class LoadingSpinnerComponent {

}