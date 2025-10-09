import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home';
import { ForgotPassword } from './forgot-password/forgot-password';
import { Setting } from './pages/setting/setting';
import { AllPosts } from './pages/all-posts/all-posts';
import { MyPosts } from './pages/my-posts/my-posts';
import { AllUsers } from './pages/all-users/all-users';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'forgot-password', component: ForgotPassword },
    { path: '', component: Home },
    { path: 'setting', component: Setting },
    { path: 'posts', component: AllPosts },
    { path: 'my-posts', component: MyPosts },
    { path: 'users', component: AllUsers },

];
