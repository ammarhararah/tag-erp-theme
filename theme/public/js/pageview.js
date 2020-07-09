// import DesktopTest from "./components/DesktopTest.vue";
// import Home from "./components/Home.vue"
import Desktop from './desktop/desktop.js';

frappe.ui.form.Sidebar.prototype.make = function(){
  var sidebar_content = frappe.render_template("form_sidebar", {doctype: this.frm.doctype, frm:this.frm});

  this.sidebar = $('<div class="form-sidebar overlay-sidebar hidden-xs hidden-sm custom-left-side-bar"></div>')
    .html(sidebar_content)
    .appendTo(this.page.sidebar.empty());

  this.comments = this.sidebar.find(".sidebar-comments");
  this.user_actions = this.sidebar.find(".user-actions");
  this.image_section = this.sidebar.find(".sidebar-image-section");
  this.image_wrapper = this.image_section.find('.sidebar-image-wrapper');
  this.make_assignments();
  this.make_attachments();
  this.make_review();
  this.make_shared();
  this.make_viewers();

  this.make_tags();
  this.make_like();
  if (frappe.boot.user.document_follow_notify) {
    this.make_follow();
  }

  this.bind_events();
  this.setup_keyboard_shortcuts();
  this.show_auto_repeat_status();
  frappe.ui.form.setup_user_image_event(this.frm);

  this.refresh();

} 


frappe.views.ListView.prototype.set_primary_action = function(){
  if (this.can_create) {
    this.page.set_primary_action(__('+'), () => {
      if (this.settings.primary_action) {
        this.settings.primary_action();
      } else {
        this.make_new_doc();
      }
    }, 'octicon octicon-plus');
  } else {
    this.page.clear_primary_action();
  }
}

frappe.views.pageview.show =  function(name) {
  if(!name) {
    name = (frappe.boot ? frappe.boot.home_page : window.page_name);

    if(name === "workspace") {
      if(!frappe.workspace) {
        let page = frappe.container.add_page('workspace');
        let container = $('<div class="container custom-main-container"></div>').appendTo(page);
        container = $('<div></div>').appendTo(container);

        frappe.workspace = new Desktop({
          wrapper: container
        })
      }

      frappe.container.change_to('workspace');
      frappe.workspace.route();
      frappe.utils.set_title(__('Desk'));
      return;
    }
  }
  frappe.model.with_doctype("Page", function() {
    frappe.views.pageview.with_page(name, function(r) {
      if(r && r.exc) {
        if(!r['403'])
          frappe.show_not_found(name);
      } else if(!frappe.pages[name]) {
        new frappe.views.Page(name);
      }
      frappe.container.change_to(name);
    });
  });

  
}
