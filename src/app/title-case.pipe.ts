import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase',
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    let words = value.split(' ');
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      word = word.slice(0, 1).toUpperCase() + word.slice(1);
      words[i] = word;
    }
    return words.join(' ');
  }
}
