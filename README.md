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

# Packages
In the explanation below we are going to use an authentication package as example.

## Setup
### Version
First, you need to create a version file `packages/authentication/version.php`
```php
return "1.0";
```
### Add to framework
A version file is the minimum requirement for adding a package to the framework.
Find `packages.php` and add package name (folder) as key and version as value.
```php
return [
    'authentication' => "1.0"
];
```

### Dependencies
If you are dependent on another package add its name and version to `packages/authentication/dependencies.php`. In our example authentication needs the database package so it can store passwords.
```php
return [
    'database' => "any"
];
```
If you need a specific version `1.2`<br>
If you need a minimum version `>1.2`<br>
If you dont care about what version `any`<br>

### Configurable
A way to communicate with other packages is to make your package configurable. Add `packages/authentication/configurable.php` with setting names and default values. More than one package can use the same name. If multiple packages talk to you this way the last package in `packages.php` decides. Authentication wants other packages to be able to tell if a page is not protected by login.
```php
return [
    'protected' => true,
];
```
See [Page->Config](#config) about how to configure another package.
<br>

## Pages
Write something about pages.

### Rounting
Before you can add a page you need to add `packages/authentication/routing.php` to your package. Routing is about telling the framework what folders to use when a user visits a specific URL. I recommend placing your pages in a subfolder, but they can be placed anywhere inside your package. In our example, we want to add a login page with URL `yoursite.com/auth/login`. The page folder is `packages/authentication/pages/login`.
```php
return [
    'auth/login' => "pages/login"
];
```

### head.php

### scripts.php
### HTML/Layout
The html content of the login page go in `packages/authentication/pages/login/content.html`. You can also add Javascript here but I recommend only using `content.html` for page layout.
```html
<form>
	<input type="text" name="username" placeholder="username" required>
	<input type="password" name="password" placeholder="password" required>
	<input type="submit" value="Login">
</form>
```

### Javascript
If your page needs Javascript you should put it in `code.js`

### style.css

### Config
<br>

## Global
### start.php
### functions.php
### head.php
### scripts.php
### pre-content.php
### post-content.php
<br>

<!-- LICENSE -->
## License
Distributed under the MIT License. See LICENSE for more information.<br>
Some of the code has its own license. If the case the license is placed in the same folder with a matching name.

<!-- CONTACT -->
## Contact
Levi Moore<br>
[levimoore.dev](https://levimoore.dev)  | mail@levimoore.dev | [@LeviMooreDev](https://twitter.com/LeviMooreDev)
