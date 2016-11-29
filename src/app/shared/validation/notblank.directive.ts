import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidatorFn, Validator, Validators } from '@angular/forms';

function isEmptyInputValue(value: any) {
  return value == null || typeof value === 'string' && value.length === 0;
}

export function notBlankValidator(): ValidatorFn {
  return(control: AbstractControl) => {
    return isEmptyInputValue(control.value) || control.value.trim() === '' ? {'blank': true} : null;
  };
}

@Directive({
  selector: '[notblank]',
  providers: [{provide: NG_VALIDATORS, useExisting: NotBlankDirective, multi: true}]
})
export class NotBlankDirective implements Validator, OnChanges {
  @Input() notblank: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['notblank'];
    if (change) {
      this.valFn = notBlankValidator();
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
