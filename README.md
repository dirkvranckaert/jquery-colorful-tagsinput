# jQuery Colorful Tags Input plugin

This plugin is based on the [jQuery Tags Input plugin](https://github.com/khenfei/jquery-tagsinput).

This plugin has several dependencies:
- jQuery 3
- jQuery Color Plus Name 2
- Bootstrap v4

## Instructions

First, add the Javascript and CSS files to `<head>` tag, and place them in the following order:
```html
<head>

  <!-- JQuery -->
  <script src="https://code.jquery.com/jquery-3.7.1.slim.min.js" integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8=" crossorigin="anonymous"></script>

  <!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>
  
  <link href="jquery-tagsinput.css" rel="stylesheet" type="text/css" />
  <script src="jquery-tagsinput.js" defer></script>
</head>
```	

Create an input element in your form. Attribute `value` is optional. When it is set, it must be in a semi-colon-separated string format.
```html
<input id="tags" name="tags" value="#FF4422tag1;#553311tag2;#22FF54tag3;" />
```
Lastly, initialize the plugin by the following statement:
```javascript
$('#tags').tagsInput();
```

Please checkout the [sample](sample/demo.html) for more details and examples.


