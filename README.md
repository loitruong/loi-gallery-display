# Loi Gallery Display

Loi Gallery Display is a jQuery plugin to display gallery in your custom grid system.

## Settings

Option | Description
------ | -----------
displayRows | Display how many rows
displayColumns | Display how many Columns
nextButton | Paste in HTML5 for this field
prevButton | Paste in HTML5 for this field
responsive | Change setting on certain screen size

## Example

```javascript
loiGalleryDisplay({
	displayRows: 2,
	displayColumns: 4,
	nextButton : "<i class="fa fa-chevron-right"></i>",
	prevButton : "<i class="fa fa-chevron-left"></i>",
	responsive : 
	[{
		breakpoint: 1199,
		settings:{
		displayRows: 2,
		displayColumns: 3,
		}
	},
	{
		breakpoint: 767,
		settings:{
			displayRows: 1,
			displayColumns: 2,
		}
	},
	{
		breakpoint: 991,
		settings:{
			displayRows: 2,
			displayColumns: 2,
		}
	}],
});
```

**[View Demo](http://loitruong.us/project/loi-gallery-display/demo)**

###Contributing

Feel free to contribute with additional animations as there is only 1 right now.

### License

Copyright (c) 2015 Loi Truong

Licensed under the MIT license.
