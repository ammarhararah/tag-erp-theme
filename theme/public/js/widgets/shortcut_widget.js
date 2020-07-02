frappe.widget.widget_factory.shortcut.prototype.set_actions= function () {
	if (this.in_customize_mode) return;

	this.widget.addClass("shortcut-widget-box custom-shortcut-widget-box");
	const get_filter = new Function(`return ${this.stats_filter}`);
	if (this.type == "DocType" && this.stats_filter) {
		frappe.db
			.count(this.link_to, {
				filters: get_filter(),
			})
			.then((count) => this.set_count(count));
	}
}
