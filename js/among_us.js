 $(document).ready(function(){
    $("#img").mousedown(function(){
            $("#content_box").css("width","200px");
    });
    $("#img").mouseup(function(){
        $("#content_box").css("width","1450px");
    });
})