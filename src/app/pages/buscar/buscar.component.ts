import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public texto : string = "";
  public movies : Movie[] = [];

  constructor( private activatedRouted : ActivatedRoute,
               private peliculasService : PeliculasService) {

  }
  ngOnInit() {

    this.activatedRouted.params.subscribe( (params : any) => {

      this.texto = params.texto;
      
      this.peliculasService.buscarPeliculas(params.texto).subscribe(movies => {
        this.movies = movies;
      })
    })
    
  }



}
