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

# Packages
In the explanation below we are going to use an authentication package as example.

## Setup
### Version
First, you need to create a version file `packages/authentication/version.php` file that returns a string.
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
If you need a specific version `1.2`.<br>
If you need a minimum version `>1.2`.<br>
If you dont care about what version `any`.<br>

### Configurable
A way to communicate with other packages is to make your package configurable. Add `packages/authentication/configurable.php` with setting names and default values. More than one package can use the same name. If multiple packages talk to you this way the last package in `packages.php` decides.
```php
return [
    'protected' => true,
];
```
See [Page->Config](#config) about how to configure another package.
<br>

## Pages
### rounting.php
### head.php
### scripts.php
### content.html
### code.js
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
