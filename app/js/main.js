'use strict';
var nums = [1, 5, 10, 20];
var result = nums.map(v => v + 1);
console.log(result);

var tabs = Array.prototype.slice.call(document.querySelectorAll('.cp-tabs'));

tabs.forEach(function(el){
	var tab = el;
	var tabItems = tab.querySelector('.cp-nav');
	var tabContentWrapper = tab.querySelector('.cp-cont');

	tabItems.addEventListener('click', function(e){
		e.preventDefault();
		var sItem = e.target;
		var dataContent = sItem.getAttribute('data-content');
		if(!sItem.classList.contains('selected')){
			var navItems = Array.prototype.slice.call(tabItems.querySelectorAll('a.selected'));
			navItems.map(function(el){
				var temp = el.getAttribute('class');
				if(temp === 'selected'){
					el.setAttribute('class', '');
				}
			});
			sItem.setAttribute('class', 'selected');

			var contItems = Array.prototype.slice.call(tabContentWrapper.querySelectorAll('li.selected'));
			contItems.map(function(el){
				var temp = el.getAttribute('class');
				if(temp === 'selected'){
					el.setAttribute('class', '');
				}
			});
			var sp = tabContentWrapper.querySelector('li[data-content="'+dataContent+'"]');
			sp.setAttribute('class', 'selected');
		}
	});

	//Default show first link
	var nav1 = tab.querySelector('.cp-nav li a');
	nav1.click();
});