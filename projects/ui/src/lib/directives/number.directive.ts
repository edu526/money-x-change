// tslint:disable
import { Directive, ElementRef, HostListener, Input, NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[mxcNumber]'
})
export class NumberDirective {
  regexStr = /^[0-9]+(\.\d{0,4})?$/;
  isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
  @Input() mxcNumber: boolean;
  @Input() maxlength: number;

  constructor(private el: ElementRef, private ngControl: NgControl) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event): any {
    const e = event as KeyboardEvent;
    if (this.mxcNumber) {
      if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }

      if (e.key === 'Dead' || (e.key === '*' && e.code === 'BracketRight')) {
        e.preventDefault();
        setTimeout(() => {
          this.clean(e.target);
          if (this.ngControl) {
            this.ngControl.control.setValue(e.target['value']);
          }
        }, 1);
      }

      // Ensure that it is a number and stop the keypress
      const next: string = this.promiseValue(event.target, event.key).value

      if (next && !String(next)
        .match(this.regexStr)) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }

  @HostListener('paste', ['$event'])
  blockPaste(e: KeyboardEvent): any {
    if (this.mxcNumber) {
      e.stopPropagation();
      e.preventDefault();
      const result = this.handlerPaste(e);
      const regEx = new RegExp(this.regexStr);
      if (regEx.test(result.value)) {
        this.ngControl.control.setValue(result.value.substring(0, this.maxlength));
      }
    }
  }

  handlerPaste($e: KeyboardEvent): any {
    const clipboard = $e['clipboardData'] || ($e['originalEvent'] && $e['originalEvent']['clipboardData'] ? $e['originalEvent']['clipboardData'] : window['clipboardData']);
    const argument = this.isIEOrEdge ? 'text' : 'text/plain';
    const value = clipboard.getData(argument);
    const valueOnlyNumber = value.match(this.regexStr);
    const valueNew = valueOnlyNumber && valueOnlyNumber.input || '';

    return this.promiseValue($e.target, valueNew);
  }

  promiseValue(domInput, insertValue): any {
    if ('selectionStart' in domInput && 'selectionEnd' in domInput) {
      const lValue = domInput.value.substring(0, domInput.selectionStart);
      const rValue = domInput.value.substring(domInput.selectionEnd, domInput.value.length);

      return {
        value: `${lValue}${insertValue}${rValue}`,
        support: true
      };
    }

    return {
      value: insertValue,
      support: false
    };
  }

  clean(el): void {
    el.value = el.value.match(this.regexStr);
  }

}

@NgModule({ declarations: [NumberDirective], exports: [NumberDirective] })
export class NumberDirectiveModule { }
