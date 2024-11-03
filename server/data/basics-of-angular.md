---
layout: ../layouts/BlogPost.astro
title: 'Basics of Angular'
slug: basics-of-angular
description: Setting up your first Angular project
tags:
  - learning
added: 2024-11-01T22:18:28.075Z
---
For work, I need to learn Angular, so I’m putting together some basics here for future reference.

After searching far and wide for a good Angular course, I couldn’t find any free ones that worked for me. Based on a Reddit recommendation, I ended up buying [Maximilian Schwarzmüller’s Angular course on Udemy](https://www.udemy.com/share/101WgA3@vaCMYeslq7ZYL7inswM0z_DBOx3BxOioM5OMD_zYgypg1JcVDUfDI0YJEFbPY2VrzQ==/). (I got lucky, because it was on sale!) While I didn’t finish it and don’t plan to, I still recommend it. The course is easy to follow, and he keeps it updated.

Angular is one of the top front-end JavaScript frameworks, widely used for large-scale applications, and is created and maintained by Google. With Angular, you can create single-page applications (SPAs), where the entire site loads in one go, instead of a typical website that loads pages one by one. For large applications, the initial load might take a bit longer, but everything is smooth afterward.

Using Angular means using TypeScript instead of JavaScript. Typescript is the same as JavaScript but with a more structured syntax, which helps prevent errors. TypeScript is compiled into JavaScript so that browsers can read it.

Applications in Angular are made up of components, which act as building blocks that make Angular modular and maintainable. Each component comes with four main files by default:
- HTML file for the layout
- TypeScript file for the component logic
- CSS file for styling
- Spec file for unit testing

There’s so much more to Angular, like dependency injections, two-way binding, signals, debugging, modules, Auth Guards… Just to keep things organized, I feel like they each would need its own post with examples and explanations. Here’s a little starter tutorial on setting up an Angular project. My end goal is to make a Note app that will be on my GitHub.

<br/>

### Getting Started with an Angular Project

1.	***Install Angular CLI globally***: In your command prompt, install Angular CLI and verify the installation.
```plaintext
npm install -g @angular/cli
ng version
```

2.	***Create a new Project***: First, navigate to the directory where you want your project to be located. Then use the command below to create a new Angular project (mine is named "Notes").
```plaintext
ng new notes
```
-	You’ll be asked if you want to share data with Google. I said no, but it doesn’t matter.
- Then, select your preferred stylesheet format. I chose CSS since I’m not familiar with the other ones.
-	You’ll also be asked about enabling Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering). For a single Page Application, say no. [Here](https://angularstart.com/modules/angular-getting-started/1/) you can find more details on this.

3.	***Open the project in Visual Studio Code (VSC)***

4.	***Run the app***: To run the app you type ng serve in the terminal. Or, if you go in the package.json, you’ll notice that you can also run the app with npm run start. Then, just like the terminal says you go to http://localhost:4200/. 
Now you’re ready to start building your Angular project!
