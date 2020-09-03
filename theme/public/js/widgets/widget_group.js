
frappe.widget.WidgetGroup.prototype.make_container = function () {
	let widget_area;
	if(this.type && this.type === "chart"){
		widget_area = $(`<div class="widget-group">
					<div class="widget-group-head custom-widget-group-head">
						<div class="widget-group-title custom-widget-group-title h6 uppercase"></div>
						<div class="widget-group-control h6 text-muted"></div>
					</div>
					<div class="chart-widget-body">
						<div class="info-widget-container" id="testWidget">
							<div class="info-widget">
								<div class="info-title">Accounting</div>
								<div class="info-details-row">
									<div class="info-details">2930 SAR</div>
									<div class="info-notification green"></div>
								</div>
							</div>
							<div class="info-widget">
								<div class="info-title">Vacations balance </div>
								<div class="info-details">034 Days</div>
							</div>
							<div class="info-widget">
								<div class="info-title">Total Tasks</div>
								<div class="info-details-row">
									<div class="info-details">120 Task</div>
									<div class="info-notification red"></div>
								</div>
							</div>
						</div>
						<div class="widget-group-body custom-widget-group-body">
						</div>
						<div class="external-apps-container">
							<div class="external-apps">
							
							</div>
						</div>
					</div>
				</div>
				`);
	}else{
		widget_area = $(`<div class="widget-group custom-widget-group">
					<div class="widget-group-head custom-widget-group-head">
						<div class="widget-group-title custom-widget-group-title h6 uppercase"></div>
						<div class="widget-group-control h6 text-muted"></div>
					</div>
					<div class="widget-group-body custom-widget-group-body">
					</div>

				</div>`);
	}
		this.widget_area = widget_area;
		if (this.hidden) this.widget_area.hide();
		this.title_area = widget_area.find(".widget-group-title");
		this.control_area = widget_area.find(".widget-group-control");
		this.body = widget_area.find(".widget-group-body");
		!this.widgets.length && this.widget_area.hide();
		widget_area.appendTo(this.container);

		frappe.db.get_list("External App Widget",
		{"fields":["*"]}).then(function(result){
			let ext_apps = result;
			let ext_apps_container = $(".external-apps");
			if (ext_apps_container){
				ext_apps_container.empty();
					ext_apps.forEach(app => {
						let app_html = `<div class="external-app"><a href="${app.app_link}">
						<img src="${app.app_icon}" alt="${app.app_title}">
						</a></div>`
						ext_apps_container.append(app_html);
					});
			}
		})
}
