
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {forwardRef, Component, ChangeDetectionStrategy, Input} from "@angular/core";
const NUMBER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TeslaCounterComponent),
  multi: true
};

@Component({
  selector: 'tesla-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tesla-counter.component.html',
  providers: [NUMBER_CONTROL_ACCESSOR],
  styleUrls: ['./tesla-counter.component.scss']
})
export class TeslaCounterComponent implements ControlValueAccessor {

  @Input() step: number = 1;
  @Input() min: number;
  @Input() max: number;
  @Input() title: string = '';
  @Input() unit: string = '';
  value: number;
  focused: boolean;

  private onTouch: Function;
  private onModelChange: Function;

  private onChange(value: number) {
    this.value = value;
    this.onModelChange(value);
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  increment() {
    if(this.value < this.max) {
      this.onChange(this.value + this.step);
    }
    this.onTouch();
  }

  decrement() {
    if (this.value > this.min){
      this.onChange(this.value - this.step);
    }
    this.onTouch();
  }

  private onBlur(event: FocusEvent) {
    this.focused = false;
    event.preventDefault();
    event.stopPropagation();
  }

  private onKeyUp(event: KeyboardEvent){
    let handlers = {
      ArrowDown: () => this.decrement(),
      ArrowUp: () => this.increment()
    };

    if(handlers[event.code]) {
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private onFocus(event: FocusEvent) {
    this.focused = true;
    event.preventDefault();
    event.stopPropagation();
  }
}
