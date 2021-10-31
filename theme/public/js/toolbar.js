frappe.ui.toolbar.Toolbar = frappe.ui.toolbar.Toolbar.extend({
	init: function() {
		$('header').append(frappe.render_template("navbar", {
			avatar: frappe.avatar(frappe.session.user)
		}));
		$('.dropdown-toggle').dropdown();

		let awesome_bar = new frappe.search.AwesomeBar();
		awesome_bar.setup("#navbar-search");
		awesome_bar.setup("#modal-search");

		this.setup_notifications();
		this.make();
		this.setup_module_sidebar();
		

		$(".custom-right-menu-icon").click(function(){
			$('#custom-right-menu').toggleClass('custom-right-menu-hide')			
		});
		
		$(".custom-left-menu-icon").click(function(){
			$('#custom-left-menu').toggleClass('custom-left-menu-hide')
		}); 
	},
	setup_module_sidebar:function(){
		let allowed_modules = frappe.boot.allowed_workspaces;
		if(allowed_modules){
			$(".custom-nav-ul ul.custom-nav").empty();
			allowed_modules.forEach(module => {
				if(module.category === "Modules"){
					let snake_case = module.name.toLowerCase().split(' ').join('-');
					$(".custom-nav-ul ul.custom-nav").append(`
					<li>
					<a href="#workspace/${module.name}" class="custom-nav-link">
						<span class="icon-${snake_case}-module"></span><br>
						${module.name}
					</a>
				</li>
					`)
				}
      });
    }
	},
  setup_sidebar: function(){
    var header = $('header');
    var layout_side_section = $('.layout-side-section');
		header.find(".toggle-sidebar").on("click", function() {
			var overlay_sidebar = layout_side_section.find('.overlay-sidebar');

			overlay_sidebar.addClass('opened');
			overlay_sidebar.find('.reports-dropdown')
				.removeClass('dropdown-menu')
				.addClass('list-unstyled');
			overlay_sidebar.find('.dropdown-toggle')
				.addClass('text-muted').find('.caret')
				.addClass('hidden-xs hidden-sm');

			$('<div class="close-sidebar">').hide().appendTo(layout_side_section).fadeIn();

			var scroll_container = $('html');
			scroll_container.css("overflow-y", "hidden");

			layout_side_section.find(".close-sidebar").on('click', close_sidebar);
			layout_side_section.on("click", "a:not(.dropdown-toggle)", close_sidebar);

			function close_sidebar(e) {
				scroll_container.css("overflow-y", "");

				layout_side_section.find("div.close-sidebar").fadeOut(function() {
					overlay_sidebar.removeClass('opened')
						.find('.dropdown-toggle')
						.removeClass('text-muted');
					overlay_sidebar.find('.reports-dropdown')
						.addClass('dropdown-menu');
				});
      }
      
    });
    
    layout_side_section.append("<p>Hello</p>")
  },
  setup_help: function(){

  }
})

frappe.views.ListGroupBy = Class.extend({
  constructor(opts) {
		$.extend(this, opts);
		this.make_wrapper();

		this.user_settings = frappe.get_user_settings(this.doctype);
		this.group_by_fields = ['assigned_to', 'owner'];
		if(this.user_settings.group_by_fields) {
			this.group_by_fields = this.group_by_fields.concat(this.user_settings.group_by_fields);
		}
		this.render_group_by_items();
		this.make_group_by_fields_modal();
		this.setup_dropdown();
		this.setup_filter_by();
	},

	make_group_by_fields_modal() {
		let d = new frappe.ui.Dialog ({
			title: __("Select Filters"),
			fields: this.get_group_by_dropdown_fields()
		});
		d.set_primary_action("Save", ({ group_by_fields }) => {
			frappe.model.user_settings.save(this.doctype, 'group_by_fields', group_by_fields || null);
			this.group_by_fields = group_by_fields ? ['assigned_to', 'owner', ...group_by_fields] : ['assigned_to', 'owner'];
			this.render_group_by_items();
			d.hide();
		});

		this.page.sidebar.find(".add-list-group-by a ").on("click", () => {
			d.show();
		});
	},

	make_wrapper() {
		this.$wrapper = this.sidebar.sidebar.find('.list-group-by');
		let html = `
			<li class="list-sidebar-label">
				${__('Filter By')}
			</li>
			<div class="list-groCreatedup-by-fields">
			</div>
			<li class="add-list-group-by list-link">
				<a class="add-group-by hidden-xs text-muted">
					${__("Add Fields")} <i class="octicon octicon-plus" style="margin-left: 2px;"></i>
				</a>
			</li>
		`;
		this.$wrapper.html(html);
	},

	render_group_by_items() {
		let get_item_html = (fieldname) => {
			let label, fieldtype;
			if (fieldname === 'assigned_to') {
				label = __('Assigned To Test');
			} else if (fieldname === 'owner') {
				label = __('Created By');
			} else {
				label = frappe.meta.get_label(this.doctype, fieldname);
				let docfield = frappe.meta.get_docfield(this.doctype, fieldname);
				if (!docfield) {
					return;
				}
				fieldtype = docfield.fieldtype;
			}

			return `<li class="group-by-field list-link">
				<div class="btn-group">
					<a class = "dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
					data-label="${label}" data-fieldname="${fieldname}" data-fieldtype="${fieldtype}"
					href="#" onclick="return false;">
						${__(label)} <span class="caret"></span>
					</a>
					<ul class="dropdown-menu group-by-dropdown" role="menu">
						<li><div class="list-loading text-center group-by-loading text-muted">
							${__("Loading...")}
							</div>
						</li>
					</ul>
				</div>
			</li>`;
		};
		let html = this.group_by_fields.map(get_item_html).join('');
		this.$wrapper.find('.list-group-by-fields').html(html);
	},

	setup_dropdown() {
		this.$wrapper.on('click', '.group-by-field', (e)=> {
			let dropdown = $(e.currentTarget).find('.group-by-dropdown');
			let fieldname = $(e.currentTarget).find('a').attr('data-fieldname');
			let fieldtype = $(e.currentTarget).find('a').attr('data-fieldtype');
			this.get_group_by_count(fieldname).then(field_count_list => {
				if (field_count_list.length) {
					this.render_dropdown_items(field_count_list, fieldtype, dropdown);
					this.sidebar.setup_dropdown_search(dropdown, '.group-by-value');
				} else {
					dropdown.find('.group-by-loading').html(`${__("No filters found")}`);
				}
			});
		});
	},

	get_group_by_dropdown_fields() {
		let group_by_fields = [];
		let fields = this.list_view.meta.fields.filter((f)=> ["Select", "Link", "Data", "Int", "Check"].includes(f.fieldtype));
		group_by_fields.push({
			label: __(this.doctype),
			fieldname: 'group_by_fields',
			fieldtype: 'MultiCheck',
			columns: 2,
			options: fields
				.map(df => ({
					label: __(df.label),
					value: df.fieldname,
					checked: this.group_by_fields.includes(df.fieldname)
				}))
		});
		return group_by_fields;
	},

	get_group_by_count(field) {
		let current_filters = this.list_view.get_filters_for_args();

		// remove filter of the current field
		current_filters =
			current_filters.filter((f_arr) => !f_arr.includes(field === 'assigned_to' ? '_assign': field));

		let args =  {
			doctype: this.doctype,
			current_filters: current_filters,
			field: field,
		};


		return frappe.call('frappe.desk.listview.get_group_by_count', args).then((r) => {
			let field_counts = r.message || [];
			field_counts = field_counts.filter(f => f.count !== 0);
			let current_user = field_counts.find(f => f.name === frappe.session.user);
			field_counts = field_counts.filter(f => !['Guest', 'Administrator', frappe.session.user].includes(f.name));
			// Set frappe.session.user on top of the list
			if (current_user) field_counts.unshift(current_user);
			return field_counts;
		});
	},

	render_dropdown_items(fields, fieldtype, dropdown) {
		let get_dropdown_html = (field) => {
			let label = field.name == null ? __('Not Specified') : field.name;
			if (label === frappe.session.user) {
				label = __('Me');
			} else if (fieldtype && fieldtype == 'Check') {
				label = label == '0'? __('No'): __('Yes');
			}
			let value = field.name == null ? '' : encodeURIComponent(field.name);

			return `<li class="group-by-item" data-value="${value}">
				<a class="badge-hover" href="#" onclick="return false;">
					<span class="group-by-value" data-name="${field.name}">${label}</span>
					<span class="badge pull-right group-by-count">${field.count}</span>
				</a>
			</li>`;
		};
		let standard_html = `
			<div class="dropdown-search">
				<input type="text" placeholder="${__('Search')}" class="form-control dropdown-search-input input-xs">
			</div>
		`;

		let dropdown_html = standard_html + fields.map(get_dropdown_html).join('');
		dropdown.html(dropdown_html);
	},

	setup_filter_by() {
		this.$wrapper.on('click', '.group-by-item', (e) => {
			let $target = $(e.currentTarget);
			let fieldname = $target.parents('.group-by-field').find('a').data('fieldname');
			let value = typeof $target.data('value') === 'string'
				? decodeURIComponent($target.data('value').trim())
				: $target.data('value');
			fieldname = fieldname === 'assigned_to' ? '_assign': fieldname;

			return this.list_view.filter_area.remove(fieldname)
				.then(() => {
					let operator = '=';
					if (value === '') {
						operator = 'is';
						value = 'not set';
					}
					if (fieldname === '_assign') {
						operator = 'like';
						value = `%${value}%`;
					}

					return this.list_view.filter_area.add(this.doctype, fieldname, operator, value);
				});
		});
	},
})