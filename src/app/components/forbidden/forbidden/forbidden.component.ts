import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 class="text-7xl font-bold text-gray-800">403</h1>
      <p class="mt-2 text-2xl text-gray-600">Dostęp zabroniony</p>
    </div>
  `
})
export class ForbiddenComponent {

}
