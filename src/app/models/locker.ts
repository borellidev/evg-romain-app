
import { Type } from '@angular/core';

export interface Locker<T> {
    label: string;
    component: Type<T>;
    data?: any;
}