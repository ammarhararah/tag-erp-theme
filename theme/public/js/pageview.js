// import DesktopTest from "./components/DesktopTest.vue";
// import Home from "./components/Home.vue"
import Desktop from './desktop/desktop.js';


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
