# Movies-Discovery
Movies Discovery is an Angular 19 application that allows users to browse, search, and view movie details based on moods like Feel Good, Action Fix, and Mind Benders. Built with TMDB APIs, Angular Material, and standalone components, this project is responsive and includes over 90% test coverage.

Fetching TMDB API Key
1.	First, sign in to TMDB if you already have an account. New users need to create one.
2.	After logging in, navigate to your account settings and click on “Apply for an API key”.
3.	You’ll be presented with a short form-fill in the required details such as project name, use case, etc.
4.	Once submitted successfully, you’ll receive an API key and a Bearer token. These are used to authenticate your API requests.

# Add your API key in src/environments/environment.ts:
running project locally:
 export const environment = {
  production: false,
  apiKey: '270f2a97ad9df0935dcb21b9e3a15c1c',
  apiUrl: 'https://api.themoviedb.org/3'
};
# MoviesDiscovery

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
