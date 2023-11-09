import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform(poster: string): string {

    if (poster) {
      return `http://image.tmdb.org/t/p/w500${poster}`
    } else {
      return 'src\assets\no-image.jpg';
    } 
  }
  

}
