import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit, AfterViewInit{

  @Input() cast? : Cast[];
  //actor.profile_path? (actor.profile_path | poster) : ''

  constructor() {

  }

  ngOnInit(){
    //console.log( this.cast );    
  }

  // Se utiliza para los swippers
  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView : 5.3,
      freeMode : true,
      spaceBetween: 15
    });
    
  }


}
