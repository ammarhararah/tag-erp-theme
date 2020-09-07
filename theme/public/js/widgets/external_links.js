frappe.db
  .get_list("External App Widget", { fields: ["*"] })
  .then(function (result) {
    let external_apps = result;
    let external_apps_container = $(".external-apps");

    if (external_apps_container) {
      external_apps_container.empty();

      external_apps.forEach((app) => {
        let external_link_wrap = $("<div />"),
          external_link = $("<a />"),
          external_image = $("<img />");

        external_link_wrap.addClass("external-app-link");
        external_link.attr("href", app.app_link);
        external_link.attr("target", "_blank");
        external_image.attr("alt", app.app_title);
        external_image.attr("src", app.app_icon);

        external_link.append(external_image);
        external_link_wrap.append(external_link);

        external_apps_container.append(external_link_wrap);
      });
    }
  });
