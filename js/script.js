var foods = [
	{
		filler: "с фуа-гра",
		bonus: ["10 порций", "мышь в подарок"],
		weight: "0,5",
		description: "Печень утки разварная с артишоками.",
		disabledText: "Печалька, с фуа-гра закончился",
		isSelected: "",
		isHovered: "",
		canHoverSelected: "",
		isDisabled: ""
	},
	{
		filler: "с рыбой",
		bonus: ["40 порций", "2 мыши в подарок"],
		weight: "2",
		description: "Головы щучьи с чесноком да свежайшая сёмгушка.",
		selectedTitle: "Котэ не одобряет?",
		disabledText: "Печалька, с рыбой закончился",
		isSelected: "true",
		isHovered: "",
		canHoverSelected: "",
		isDisabled: ""
	},
	{
		filler: "с курой",
		bonus: ["100 порций", "5 мышей в подарок", "заказчик доволен"],
		weight: "5",
		description: "Филе из цыплят с трюфелями в бульоне.",
		disabledText: "Печалька, с курой закончился",
		isSelected: "",
		isHovered: "",
		canHoverSelected: "",
		isDisabled: "true"
	}
]

$(document).ready(function() {
	ractive = new Ractive({
		target: '.food__list',
		template: '#template',
		data: { model: foods }
	});

	var model = ractive.get('model');
	var items = $(".product");

	$.each(items, function(idx) {
		if(model[idx].isSelected) {
			$(this).addClass("product--selected");
			model[idx].canHoverSelected = true;
		} else if (model[idx].isDisabled) {
			$(this).addClass("product--disabled");
		}
	});

	$(".product").click(function(e) {
		var idx = $(this).index();
		if($(this).hasClass("product--selectHovered")) {
			$(this).removeClass("product--hovered product--selectHovered");
			$(this).addClass("product--hovered");
			model[idx].isHovered = false;
		} else if ($(this).hasClass("product--hovered")) {
			$(this).removeClass("product--hovered");
		}

		if($(e.target).is(".product__info") || $(e.target).parent(".product__info") || $(e.target).is(".product__buy-link")) {
			if(model[idx].isDisabled) return;
			else {
				model[idx].isSelected = !model[idx].isSelected;
			}
			ractive.update('model');
			$(this).toggleClass("product--selected");
		}
		return false;
	});

	$(".product").hover(function(e) {
		var idx = $(this).index();
		if(!model[idx].isSelected && !model[idx].isDisabled) {
			$(this).addClass("product--hovered");
		}
		if(model[idx].canHoverSelected && model[idx].isSelected) {
			model[idx].canHoverSelected = false;
			$(this).addClass("product--selectHovered");
			model[idx].isHovered = true;
			ractive.update('model');
		}
	},
 	function(){
		var idx = $(this).index();
		$(this).removeClass("product--hovered");
		if(model[idx].isSelected) {
			model[idx].canHoverSelected = true;
			$(this).removeClass("product--selectHovered");
			model[idx].isHovered = false;
			ractive.update('model');
		}
	});
});
