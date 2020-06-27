frappe.ui.Page = frappe.ui.Page.extend({
	
	add_main_section: function() {
		$(frappe.render_template("page", {})).appendTo(this.wrapper);
		if(this.single_column) {
			// nesting under col-sm-12 for consistency
			this.add_view("main", '<div class="row layout-main">\
					<div class="col-md-12 layout-main-section-wrapper">\
						<div class="layout-main-section"></div>\
						<div class="layout-footer hide"></div>\
					</div>\
				</div>');
		} else {
			this.add_view("main", '<div class="row layout-main">\
				<div class="col-md-12 layout-side-section"></div>\
				<div class="col-md-12 layout-main-section-wrapper">\
					<div class="layout-main-section"></div>\
					<div class="layout-footer hide"></div>\
				</div>\
			</div>');
		}

		this.setup_page();
	},
	
});

frappe.views.ListSidebar.prototype.make = function () {
		var sidebar_content = frappe.render_template("list_sidebar", { doctype: this.doctype });

		this.sidebar = $('<div class="list-sidebar overlay-sidebar hidden-xs hidden-sm custom-left-side-bar "></div>')
			.html(sidebar_content)
			.appendTo(this.page.sidebar.empty());

		this.setup_reports();
		this.setup_list_filter();
		this.setup_views();
		this.setup_kanban_boards();
		this.setup_calendar_view();
		this.setup_email_inbox();
		this.setup_keyboard_shortcuts();
		this.setup_list_group_by();

		// do not remove
		// used to trigger custom scripts
		$(document).trigger('list_sidebar_setup');

		if (this.list_view.list_view_settings && this.list_view.list_view_settings.disable_sidebar_stats) {
			this.sidebar.find('.sidebar-stat').remove();
		} else {
			this.sidebar.find('.list-stats').on('click', (e) => {
				this.reload_stats();
			});
		}
  }
  