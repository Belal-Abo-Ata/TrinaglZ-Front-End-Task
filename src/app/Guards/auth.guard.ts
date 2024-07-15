import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('email');
  const router = new Router();

  if (!isLoggedIn) {
    router.navigate(['/login'])
    return false;
  }

  return true
};
