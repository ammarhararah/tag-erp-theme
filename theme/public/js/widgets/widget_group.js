frappe.widget.WidgetGroup.prototype.make_container = function () {
	const widget_area = $(`<div class="widget-group">
				<div class="widget-group-head custom-widget-group-head">
					<div class="widget-group-title custom-widget-group-title h6 uppercase"></div>
					<div class="widget-group-control h6 text-muted"></div>
				</div>
				<div class="widget-group-body custom-widget-group-body">
				</div>
			</div>`);
		this.widget_area = widget_area;
		if (this.hidden) this.widget_area.hide();
		this.title_area = widget_area.find(".widget-group-title");
		this.control_area = widget_area.find(".widget-group-control");
		this.body = widget_area.find(".widget-group-body");
		!this.widgets.length && this.widget_area.hide();
		widget_area.appendTo(this.container);
}
