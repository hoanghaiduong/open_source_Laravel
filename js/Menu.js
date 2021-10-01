$(document).ready(function(){
      $("#sidebarCollapse").click(function(){
          $("#sidebar").toggleClass('active');
      });
      $(".btn-close").click(function(){
        $("#sidebar").removeClass('active');
    });
  });