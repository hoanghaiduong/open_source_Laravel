

 $(document).ready(function () {
    let dynamicURL =""
    let methodName =""
   
    $(".btn-add").click(function(){
        $("#form")[0].reset();
        $("#add").html(`Thêm`)
       
    })


function showData(){
    output ="";
    input ="";
    
    $.ajax({
        url:'https://60a1391bd2855b00173b1cf3.mockapi.io/season',
        method:'GET',
        success: function(data){
            for(i=0; i <data.length;i++){
                output +=  
                `<tr>
                <td>${i+1}</td>
                <td>${data[i].seasonName}</td> 
                <td>${data[i].quantity}</td>
                <td>${data[i].startDate}</td>
                <td>${data[i].endDate}</td>
                <td data-label="Công cụ">
                  <div class="btn-group">
                    <a href="" class=" btn-edit" data-id="${data[i].id}"><i class="fas fa-edit"></i></a>
                    <a href="" class=" btn-del" data-id="${data[i].id}"><i class="fas fa-trash-alt"></i></a>
                  </div>
                </td>
                
                </tr>`

            }
            $("#tbody").html(output)
            $("table").trigger("update", false);
            $("#myTable").tablesorter({
        
                theme: "bootstrap",

                widthFixed: true,
                widgets : [ "filter", "columns", "zebra" ],
            
                widgetOptions : {
                  zebra : ["even", "odd"],
                  columns: [ "primary", "secondary", "tertiary" ],
                  filter_cssFilter: "form-control",
                  filter_reset: '.reset',
                }
              })
              .tablesorterPager({
                removeRows: false,
                container: $(".ts-pager"),
                cssGoto  : ".pagenum",
                output: '{startRow} - {endRow} / {filteredRows} ({totalRows})',
               
              });
              
        }
      
    })
}
showData()
   


$("#form").on('submit', function(e){
    e.preventDefault();
    var seasonName = $("#seasonName").val();
    var quantity =$("#quantity").val();
    var startDate =$("#startDate").val();
    var endDate =$("#endDate").val();
    let bokID = $("#txtId").val()
     




        if (bokID) {
            dynamicURL ="https://60a1391bd2855b00173b1cf3.mockapi.io/season/"+bokID;
            methodName = "PUT";
            
        } else {
            dynamicURL ="https://60a1391bd2855b00173b1cf3.mockapi.io/season/";
            methodName = "POST"
        }
                $.ajax({
                    url:dynamicURL,
                    method: methodName,

                    data:{
                        seasonName:seasonName,
                        quantity:quantity,

                        startDate:startDate,
                        endDate:endDate,
                    },
                    success: function(data){
                      
                        
                        $("#form")[0].reset();
                        showData(data)
                        $(".modal").modal("hide")
                      
                    }
                  
                }) 
           
   


  
})



$("tbody").on("click", ".btn-del", function(e){
    e.preventDefault();
    let id = $(this).attr("data-id")
    $.ajax({
        url:'https://60a1391bd2855b00173b1cf3.mockapi.io/season/'+id,
        method:'DELETE',
        dataType:'json',
        data:
           JSON.stringify()
        ,
        success: function(data){
            showData(data)
        }
      
    }) 
})


$("tbody").on("click", ".btn-edit", function(e){
    e.preventDefault();
    $(".modal").modal("show")
    $("#add").html(`Sửa`)
    let id = $(this).attr("data-id")
    $.ajax({
        url:'https://60a1391bd2855b00173b1cf3.mockapi.io/season/'+id,
        method:'GET',
        dataType: 'json', 
        success: function(data){
            $('#txtId').val(data.id)
            $("#seasonName").val(data.seasonName)
            $('#startDate').val(data.startDate)
            $('#endDate').val(data.endDate)
            $('#quantity').val(data.quantity)
            
        }
      
    }) 
})


   
})


