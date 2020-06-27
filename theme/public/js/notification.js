frappe.ui.Notifications.prototype.make = function (){   

    this.$dropdown = $('.custom-right-sidemenu').find('.dropdown-notifications');
    this.$dropdown_list = this.$dropdown.find('.notifications-list');
    this.$notification_indicator = this.$dropdown.find(
      '.notifications-indicator'
    );
    this.user = frappe.session.user;
    this.max_length = 20;

    this.render_dropdown_headers();
    this.$notifications = this.$dropdown_list.find(
      '.category-list[data-category="Notifications"]'
    );
    this.$open_docs = this.$dropdown_list.find(
      '.category-list[data-category="Open Documents"]'
    );
    this.$today_events = this.$dropdown_list.find(
      '.category-list[data-category="Todays Events"]'
    );

    frappe.utils.bind_actions_with_object(this.$dropdown_list, this);
    let me = this;
    frappe.search.utils.make_function_searchable(
      me.route_to_settings,
      __('Notification Settings'),
    );

    this.setup_notifications();
    this.bind_events();

}