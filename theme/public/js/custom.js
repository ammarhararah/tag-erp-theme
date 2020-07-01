
frappe.after_ajax(function() {

  $(".custom-right-menu-icon").click(function(){
    $('#custom-right-menu').toggleClass('custom-right-menu-hide')
    console.log("Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeessssssssssssssssssssssssssssstttttt");
    
  });
  
  $(".custom-left-menu-icon").click(function(){
    $('#custom-left-menu').toggleClass('custom-left-menu-hide')
  }); 

  // $(document).click(function() {
  //   $('#custom-right-menu').addClass('custom-right-menu-hide')
  //   $('#custom-left-menu').addClass('custom-left-menu-hide')
  // });

});