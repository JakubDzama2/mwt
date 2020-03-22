import { Pipe, PipeTransform } from '@angular/core';
import { Postava } from 'src/entities/postava';
import { Clovek } from 'src/entities/clovek';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'postavyToString'
})
export class PostavyToStringPipe implements PipeTransform {

  transform(postavy: Postava[], dolezitost: string): string {
    return postavy
      .filter(postava => postava.dolezitost === dolezitost)
      .map(postava => this.clovekToString(postava.herec) + " (" + postava.postava + ")")
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
