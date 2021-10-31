// console.log("Generate resposive")
// frappe.after_ajax(function() {
//   console.log("test")
//   console.log($(".custom-right-menu-icon"))

//   $(".custom-right-menu-icon").click(function(){
//     $('#custom-right-menu').toggleClass('custom-right-menu-hide')
//     console.log("Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeessssssssssssssssssssssssssssstttttt");
    
//   });
  
//   $(".custom-left-menu-icon").click(function(){
//     $('#custom-left-menu').toggleClass('custom-left-menu-hide')
//   }); 

//   // $(document).click(function() {
//   //   $('#custom-right-menu').addClass('custom-right-menu-hide')
//   //   $('#custom-left-menu').addClass('custom-left-menu-hide')
//   // });

// });

document.addEventListener("load", function(){
    //dom is fully loaded, but maybe waiting on images & css files
    console.log("hello load");
});
frappe.ui.Page = class Page extends frappe.ui.Page{
    constructor(props){
        super(props);
        this.clear_actions()
    }
}

frappe.utils.scroll_to = function(element, animate=true, additional_offset, element_to_be_scrolled){
    element_to_be_scrolled = element_to_be_scrolled || $(".custom-mid-section");
		let scroll_top = 0;
		if (element) {
			// If a number is passed, just subtract the offset,
			// otherwise calculate scroll position from element
			scroll_top = typeof element == "number"
				? element - cint(additional_offset)
				: this.get_scroll_position(element, additional_offset);
		}

		if (scroll_top < 0) {
			scroll_top = 0;
		}

		// already there
		if (scroll_top == element_to_be_scrolled.scrollTop()) {
			return;
		}

		if (animate) {
			element_to_be_scrolled.animate({ scrollTop: scroll_top });
		} else {
			element_to_be_scrolled.scrollTop(scroll_top);
		}
}