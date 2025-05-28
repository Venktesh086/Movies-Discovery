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
