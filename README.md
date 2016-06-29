angular-form-persistence
========================

## Get Started

### Installation

**npm**
```
$ npm install angular-form-persistence
```

Include `angular-form-persistence.js` or `angular-form-persistence.min.js` in your `index.html` after Angular.

``` html
<script src="node_modules/angular-form-persistence.min.js"></script>
```

Or import `angular-form-persistence` in your JS.

``` javascript
require('angular-form-persistence');
```

Add `formPersistence` to your module's dependencies.
``` javascript
angular.module('app', ['formPersistence']);
```

## Configuration

### setPrefix

``` javascript
.config(function (formPersistenceProvider) {
    formPersistenceProvider.setPrefix('dmo');
});
```

**Default prefix:** `fp.[key]`


## Usage
Directive `formPersistence`, along with attribute `save-data` allow you to set the key and the data (respectively) to be stored.

### Example
In this example `user_form` is the key and `vm.data` is the data that will be stored.

`formPersistence` will listen for changes in `save-data` and save the object with every change detected. In the example below, `vm.data`  has some properties bounded to ngModel directive, so every time the user changes the value in the inputs the objects `vm.data` will be saved under the `user_form` key.

When the view is reloaded, `formPersistence` will fill `vm.data` with the data stored in local storage.

**Controller**
``` javascript
angular.controller('myController', function(formPersistence) {
    'ngInject';

    var vm = this;

    vm.data = {};

    vm.submit = function() {
        formPersistence.clearAll();
        [...]
    };
});
```

**View**
``` html
<div ng-controller="myController as vm">
    <form form-persistence="user_form" save-data="vm.data" ng-submit="vm.submit()">
        <label for="username">Username</label>
        <input
            id="username"
            type="text"
            name="username"
            ng-model="vm.data.username" />

        <label for="name">Name</label>
        <input
            id="name"
            type="text"
            name="name"
            ng-model="vm.data.name" />

        <label for="age">Age</label>
        <input
            id="age"
            type="number"
            name="age"
            ng-model="vm.data.age" />

        <button type="submit">
            Submit
        </button>
    </form>
</div>
```

### Other attributes

#### beforeSave
Get and use the data before is saved.
Must return the data that will be saved.

#### beforeLoad
Get and use the data before is loaded into `save-data`.
Must return the data that will fill `save-data`.

**Controller**
``` javascript
angular.controller('myController', function(formPersistence) {
    'ngInject';

    var vm = this;

    vm.data = {};

    vm.parseData = function(data) {
        // you logic
        return data;
    };

    vm.parseLoadedData = function(data) {
        // you logic
        return data;
    };
});
```

**View**
``` html
<div ng-controller="myController as vm">
    <form form-persistence="user_form" save-data="vm.data" before-save="vm.parseData" before-load="vm.parseLoadedData">
        [...]
    </form>
</div>
```

## Service API

### save
Save data manually in local storage.

|Parameter  |Description|
|-----------|-----------|
|**key**    |Data key (automatically prefixed)|
|**payload**|Data to be stored|
|**onSave** |Optional function to handle the data before is stored|

``` javascript
formPersistence.save(key, payload, onSave);
```

### load
Load data from local storage.

|Parameter  |Description|
|-----------|-----------|
|**key**    |Data key (automatically prefixed)|
|**onLoad** |Optional function to handle the data before is loaded|

**Return:** Data stored or onLoad results

``` javascript
var data = formPersistence.load(key, onLoad);
```

### clear
Remove data stored with the given key.

|Parameter  |Description|
|-----------|-----------|
|**key**    |Data key (automatically prefixed)|


``` javascript
formPersistence.clear(key);
```

### clearAll
Remove all stored data and keys.

``` javascript
formPersistence.clearAll();
```
