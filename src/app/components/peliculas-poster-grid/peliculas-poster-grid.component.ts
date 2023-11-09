import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit{

  @Input() movies : Movie[] | undefined;

  constructor( private router : Router) {

  }
  ngOnInit(): void {
    //console.log(this.movies);
  }

  onMovieClick( movie : Movie ) {
    //console.log(movie);
    // Para navegar a otra pantalla. 'pelicula' es la ruta que defini en el app-routing-module
    this.router.navigate(['pelicula', movie.id]);
  }

}
