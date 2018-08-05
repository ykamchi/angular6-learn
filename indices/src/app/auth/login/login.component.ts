import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    //loginForm: FormGroup;
    username: string;
    password: string;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    hide = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService) {}

    ngOnInit() {
        /*this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });*/

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    //get f() { return this.loginForm.controls; }

    onLogin() {
        this.submitted = true;

        // stop here if form is invalid
        //if (this.loginForm.invalid) {
        //    return;
        //}

        this.loading = true;
        this.authenticationService.login(this.username, this.password)
            .pipe(first())
            .subscribe(
                data => {
                    console.log("###### ok : " + this.returnUrl);
                    this.router.navigate([this.returnUrl]);
                },
                err => {

                    console.log("###### error: " + this.returnUrl+" "+err.error);
                    this.error = err.error;
                    this.loading = false;
                });
    }

    onRegister() {
        this.authenticationService.register(this.username, this.password)
            .subscribe(
                data => {
                    console.log("###### : " + this.returnUrl);
                    this.onLogin();
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });

    }
}
