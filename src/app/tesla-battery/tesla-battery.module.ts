import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BatteryService } from './tesla-battery.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    BatteryService
  ],
  exports: []
})

export class TeslaBatteryModule {}
