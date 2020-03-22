import { Pipe, PipeTransform } from '@angular/core';
import { Clovek } from 'src/entities/clovek';

@Pipe({
  name: 'ludiaToString'
})
export class LudiaToStringPipe implements PipeTransform {

  transform(ludia: Clovek[], ...args: unknown[]): string {
    return ludia
    .map((clovek: Clovek) => this.clovekToString(clovek))
    .join(", ");
  }

  private clovekToString(clovek: Clovek): string {
    let result: string = "";
    if (clovek.krstneMeno) {
      result += clovek.krstneMeno + " ";
    }
    if (clovek.stredneMeno) {
      result += clovek.stredneMeno + " ";
    }
    result += clovek.priezvisko;
    return result;
  }

}
