import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl : string = 'https://api.themoviedb.org/3'; 
  private carteleraPage = 1;
  public cargando : boolean = false;

  constructor( private http : HttpClient) { 
    
  }

  get params() {
    return {
      language : 'en-US',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera () : Observable<Movie[]> {

   if (this.cargando) {
    return of ([]);
   }

    this.cargando = true;

    const url = `${this.baseUrl}/movie/popular?${this.params}`;
    const headers = new HttpHeaders({
      
      Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmU4NWY3OTRhNzBiMjQyNTEwZDgwN2NhZmFiN2ZlZiIsInN1YiI6IjY1NDRmMzcxOWNjNjdiMDBkZjkyNzFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WZkemxn7pv3tN5di0FanvI1ERJu6lG5Ly1c_rhSX4Ag'
      
    })
    return this.http.get<CarteleraResponse>(url, {headers}).pipe(map( (resp) => resp.results),
      tap ( () => {
      this.carteleraPage = this.carteleraPage + 1;
      this.cargando = false;
    }));
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

 

  buscarPeliculas( texto : string ) : Observable<Movie[]> {

    const params = {
      query : texto,
      include_adult : false,
      language : 'en-US',
      page : '1'    
    };

    const url = `${this.baseUrl}/search/movie?`;
    const headers = new HttpHeaders({
      Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmU4NWY3OTRhNzBiMjQyNTEwZDgwN2NhZmFiN2ZlZiIsInN1YiI6IjY1NDRmMzcxOWNjNjdiMDBkZjkyNzFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WZkemxn7pv3tN5di0FanvI1ERJu6lG5Ly1c_rhSX4Ag'
    });    

    return this.http.get<CarteleraResponse>(url, {headers, params}).pipe(
      map(
        resp => resp.results)
    )
  }

  getPeliculaDetalle (id : string) {

    const params = {
      language : 'en-US'
    }

    const url = `${this.baseUrl}/movie/${id}?`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmU4NWY3OTRhNzBiMjQyNTEwZDgwN2NhZmFiN2ZlZiIsInN1YiI6IjY1NDRmMzcxOWNjNjdiMDBkZjkyNzFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WZkemxn7pv3tN5di0FanvI1ERJu6lG5Ly1c_rhSX4Ag'
    })
    
    return this.http.get<MovieResponse>(url, {headers, params}).pipe(
      catchError( err => of(null))
    )
  }

  getCredits (id : string) {

    const params = {
      language : 'en-US'
    }
    
    const url = `${this.baseUrl}/movie/${id}/credits?`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmU4NWY3OTRhNzBiMjQyNTEwZDgwN2NhZmFiN2ZlZiIsInN1YiI6IjY1NDRmMzcxOWNjNjdiMDBkZjkyNzFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WZkemxn7pv3tN5di0FanvI1ERJu6lG5Ly1c_rhSX4Ag'
    })

    return this.http.get<CreditsResponse>(url, {headers, params}).pipe(      
      map(
        resp => resp.cast),
        catchError( err => of([]))
    );
  }
  
}
