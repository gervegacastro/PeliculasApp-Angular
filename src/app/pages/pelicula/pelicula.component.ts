import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit{

  public movie? : MovieResponse;
  public cast : Cast[] = [];

  constructor (private activatedRouted : ActivatedRoute,
               private peliculasService : PeliculasService,
               private location : Location,
               private router : Router) {

  }

  ngOnInit() {

    const id = this.activatedRouted.snapshot.params['id'];

    combineLatest([

      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCredits(id)

    ]).subscribe( ([movie, cast]) => {

      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      } else {
        this.movie = movie;
      }  
      this.cast = cast; 
    });

    //Primera forma, con los observables separados!!
    /* 
    this.peliculasService.getPeliculaDetalle(id).subscribe(movie => {
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      } else {
        this.movie = movie;
      }            
    });
    
    this.peliculasService.getCredits(id).subscribe(cast => {
      console.log(cast);
      this.cast = cast;
    })*/
  }

  // funcion para volver desde donde estaba ubicado el usuario
  goBack() {
    this.location.back();
  }

}
