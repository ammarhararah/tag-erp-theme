# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "theme"
app_title = "Theme"
app_publisher = "mai"
app_description = "Theme for frappe"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "mai.mq.1995@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = ["/assets/theme/css/theme.css"] 
app_include_css = [
  "/assets/theme/css/theme.css" ,
  "/assets/theme/css/icons-font/icon-style.css",
  "/assets/theme/css/font/style.css"
]
app_include_js = [
  "/assets/js/theme.min.js",
  "/assets/theme/js/leftsidebar.js",
  "/assets/theme/js/pageview.js",
  "/assets/theme/js/notification.js",
  "/assets/theme/js/chat.js",
  "/assets/theme/js/custom.js",
  "/assets/theme/js/widgets/widget_group.js",
  "/assets/theme/js/widgets/shortcut_widget.js",
  "/assets/theme/js/desktop/desktop.js"
]

# include js, css files in header of web template
# web_include_css = "/assets/theme/css/theme.css"
# web_include_js = "/assets/theme/js/theme.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_js = {"custom-js" : "public/js/custom.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "theme.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "theme.install.before_install"
# after_install = "theme.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "theme.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"theme.tasks.all"
# 	],
# 	"daily": [
# 		"theme.tasks.daily"
# 	],
# 	"hourly": [
# 		"theme.tasks.hourly"
# 	],
# 	"weekly": [
# 		"theme.tasks.weekly"
# 	]
# 	"monthly": [
# 		"theme.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "theme.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "theme.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "theme.task.get_dashboard_data"
# }

