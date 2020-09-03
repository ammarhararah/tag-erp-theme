console.log('file running');
frappe.widget.widget_factory.number_card.prototype.make = function(){
    this.make_widget();
		let numberCardContainer = document.querySelector('#testWidget');
		this.widget.appendTo(numberCardContainer);
    console.log('Fetching into', numberCardContainer);
}
