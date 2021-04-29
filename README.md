<p align="center">
	<h1 align="center"> PHP Lightweight Framework</h1>
</p>

I made this framework to achieve 3 things when working on personal web projects.
1. Easy reuse of code.<br>
Because everything is split into packages I can easily take them with me to my next project.<br><br>
2. Easy updating of old projects.<br>
As I find and fix issues while working on new projects, old projects can just pull and merge to get them as well.<br><br>
3. Fast prototyping.<br>
For big systems and paid work I normally use Laravel, but for things like a ToDo app or when prototyping, a simple framework structure is better.<br><br>

I have used and tested the framework on PHP version 7.4

# Examples
If you want to see some examples of packages I have a repository with most of the packages I have made.<br>[PHP Lightweight Framework Packages](https://github.com/LeviMooreDev/PHP-Lightweight-Framework-Packages).

You can also have a look at a complete Todo app made using the framework.<br>[PHP ToDo Web App](https://github.com/LeviMooreDev/PHP-ToDo-Web-App).



# Packages
## Setup
### Version
First, you need to create a version file `packages/YOUR_PACKAGE/version.php`
```php
return "1.0";
```
### Add to framework
A version file is the minimum requirement for adding a package to the framework.
Find `packages.php` and add package name (folder) as key and version as value.
```php
return [
    'YOUR_PACKAGE' => "1.0"
];
```

### Dependencies
If you are dependent on another package add its name and version to `packages/YOUR_PACKAGE/dependencies.php`. If you package needs the databse package it would look like this.
```php
return [
    'database' => "any"
];
```
If you need a specific version `1.2`<br>
If you need a minimum version `>1.2`<br>
If you dont care about what version `any`<br>

### Configurable
A way to communicate with other packages is to make your package configurable. Add `packages/YOUR_PACKAGE/configurable.php` with setting names and default values. More than one package can use the same name. If multiple packages talk to you this way the last package in `packages.php` decides. If you are making an authentication package you may want to let pages tell if they are protected by login.
```php
return [
    'protected' => true,
];
```
See [Page->Config](#config) about how to configure another package.
<br>

## Pages
### Rounting
Before you can add a page you need to add `packages/YOUR_PACKAGE/routing.php` to your package. Routing is about telling the framework what folders to use when a user visits a specific URL. I recommend placing all your pages in a subfolder, but they can be placed anywhere inside your package. If you want to make a login page with URL `YOUR_WEBSITE.com/auth/login` that uses folder `packages/YOUR_PACKAGE/pages/login` it would look like this.
```php
return [
    'auth/login' => "pages/login"
];
```

### HTML Header
If your page requires something to be set in the HTML header you can add it to `packages/YOUR_PACKAGE/pages/YOUR_PAGE_FOLDER/head.html`. You can also use `head.php`.

### HTML Body
Your page HTML is placed in `packages/YOUR_PACKAGE/pages/YOUR_PAGE_FOLDER/content.html`. You can also add Javascript here but I recommend only using `content.html` for html. You can also use `content.php`.

### Javascript
Your page Javascript is placed in `packages/YOUR_PACKAGE/pages/YOUR_PAGE_FOLDER/code.js`.

### Styling
Your page css is placed in `packages/YOUR_PACKAGE/pages/YOUR_PAGE_FOLDER/style.css`.

### Config
Your page can talk with other packages using `packages/YOUR_PACKAGE/pages/YOUR_PAGE_FOLDER/config.php`. Let us say you have an authentication package that is configured to ignore all pages with protected set to false. If you want to add a login page that is ignored by the authentication package it would look like this.
```php
return [
    'protected' => false
];
```

## Global
A package can contain global files that are added to all pages from all packages. Global files are placed in the root of your package folder.

### start.php
Code inside `packages/YOUR_PACKAGE/start.php` is called before anything else when visiting a page.

### Functions
If you have functions that you want all packages to have access to, place them in `packages/YOUR_PACKAGE/functions.php`. This file should only contain functions. If you want your code to execute immediately use `start.php`

### HTML Header
If you want to add something to all page HTML headers you can use `packages/YOUR_PACKAGE/head.php`. This can be useful for things like a theme package.

### Javascript
If you want to add some Javascript to all pages you can use `packages/YOUR_PACKAGE/scripts.php`.

### Before page content
If you want to add HTML before a pages `content.php` file you can use `packages/YOUR_PACKAGE/pre-content.php`. Useful when making a theme package.

### post-content.php
If you want to add HTML after a pages `content.php` file you can use `packages/YOUR_PACKAGE/post-content.php`. Useful when making a theme package.

<br>

<!-- LICENSE -->
## License
Distributed under the MIT License. See LICENSE for more information.<br>
Some of the code has its own license. If the case the license is placed in the same folder with a matching name.

<!-- CONTACT -->
## Contact
Levi Moore<br>
[levimoore.dev](https://levimoore.dev)  | mail@levimoore.dev | [@LeviMooreDev](https://twitter.com/LeviMooreDev)
