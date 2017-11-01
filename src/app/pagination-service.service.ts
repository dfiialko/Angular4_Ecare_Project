import { Injectable } from '@angular/core';

@Injectable()
export class PaginationServiceService {

    pageIndex = 0;
    fromIndex = 0;
    toIndex = 5;

    constructor() { }

    previousClickPagination() {
        if (this.fromIndex >= 5) {
            this.fromIndex -= 5;
            this.toIndex -= 5;
        }
    }
    nextClickPagination(users) {
        if (users.length >= this.toIndex) {
            this.fromIndex += 5;
            this.toIndex += 5;
        }
    }
    paginationDisplayNext(number) {
        if (number > 1) {
            this.fromIndex = (number - 1) * 5;
            this.toIndex = number * 5;
        } else {
            this.fromIndex = 0;
            this.toIndex = 5;
        }
    }

}