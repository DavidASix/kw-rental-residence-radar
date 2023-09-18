# NextJS Frontend

## Getting Started

After running a git clone on this repository, and you've created your Firebase project & app, follow these steps to set up the Frontend.

### Firebase Setup
* **Create a new app** Go to settings and create and app called site
* **During App Setup, Associate with site-MYSITE** hosting account.

### App Setup

* **npm install**
Run npm install to install fresh copies of all packages
```npm install```
* **package.json**
Add site name
* **firebase.json**
Add hosting site title from Firebase
* **.firebaserc**
Change project name in .firebaserc
* **Add src/assets/firebase-config.json**
File should contain the following:
```
{
    "apiKey": "",
    "authDomain": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": "",
    "appId": "",
    "measurementId": "",
}
```
* **public/favicon.ico**
Update favicon
* **src/assets/constants.js**
Update siteName and other constants
* **src/pages/_app.js**
Update title and description


### Styling
* **src/pages/_document_.js**
Add font imports & set default theme
* **src/styles/theme.css**
Update color theme
* **src/styles/bootstrap.scss**
Update color values here, then run:
```sass src\styles\bootstrap.scss src\styles\bootstrap.css```

### Optional
* **Update 404 page**

### Finalization
* **Testing** run ```npm run dev``` and ensure something is displayed
* **Deploy** ```firebase deploy```  YOU MAY NEED TO DO THIS TWICE. The first can fail due to billing not being initialized on GC. Just try again.

### Git 
* **Create a repo** should be private and named like ```mysite.com```
* **Delete .git in both site and cms** This removes their boilerplate repos
* **Initialize in mysite.com/ and push**