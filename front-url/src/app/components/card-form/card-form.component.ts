import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent {
  url: any;
  urlCount: number = 0;

  constructor(@Inject(ApiService) private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getURL().subscribe((data) => {
      this.url = data.urls;
      console.log(this.url, 'url');
    });
    this.apiService.getURLCount().subscribe((data) => {
      this.urlCount = data.count;
    });
  }
  resolveURL(short: string) {
    this.apiService.resolveURL(short).subscribe(
      (response) => {
        console.log('URL résolue :', response);
        // Gérer la réponse du serveur ici, par exemple, rediriger l'utilisateur vers l'URL résolue
        window.location.href = response.url;
      },
      (error) => {
        console.error('Erreur lors de la résolution de l\'URL :', error);
        // Gérer les erreurs ici
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.apiService.shortenURL(form.value.url, form.value.short).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
           form.reset();
           this.urlCount++;
          this.url.push(response.short);
          // Gérer la réponse du serveur ici
          if (response.error === 'Rate limit exceeded') {
            const resetTime = response.rate_limit_reset;
            const minutes = Math.floor(resetTime / 60); // Convertir le temps en minutes
            const seconds = resetTime % 60; // Obtenir les secondes restantes
            alert(`Limite de taux dépassée. La limite de taux sera réinitialisée dans ${minutes} minutes et ${seconds} secondes.`);
          } else {
            // Gérer d'autres types d'erreurs ou traiter la réponse réussie
          }
        },
        (error) => {
          console.error('Erreur lors de la requête :', error);
          // Gérer les erreurs ici
        }
      );
    }
  }


}
