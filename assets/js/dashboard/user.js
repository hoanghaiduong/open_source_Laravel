var language = {
    "decimal": "",
    "emptyTable": "Không có dữ liệu trong bảng",
    "info": "Đang Hiển thị _START_ / _END_ trong tổng số _TOTAL_ bản ghi",
    "infoEmpty": "Không có bản ghi !",
    "infoFiltered": "(Đã lọc trong _MAX_ tổng số bản ghi)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "Hiển Thị _MENU_ mục",
    "loadingRecords": "Đang tải...",
    "processing": "Đang xử lý...",
    "search": "Tìm Kiếm ",
    "zeroRecords": "Không tìm thấy người dùng nào",
    "paginate": {
        "first": "Trang Đầu",
        "last": "Trang Cuối",
        "next": "Tiếp",
        "previous": "Trở về"
    },
    "aria": {
        "sortAscending": ": Kích hoạt để sắp xếp cột tăng dần",
        "sortDescending": ": Kích hoạt để sắp xếp cột giảm dần"
    }
};



$(document).ready(function () {
    loadData();
});


var hidden = $('#hidden');
var IsAdd = true;
var usn = $("#usn");
var psw = $("#psw");
var gd = $("#gd");
var tt = $("#tt");
var qtc = $("#qtc");
var validate1 = true;
var validate2 = true;
/* Hàm validate */
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;//định dạng email
var valiPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;//định dạng mật khẩu
var textunique = /[A-Za-z].{6,20}$/;//định dạng chỉ chữ thường

function validatePass($pass) {
    return valiPass.test($pass);
}
function textUnique($username) {
    return textunique.test($username);
}
/*Kết thúc khai báo validate*/
async function loadData() {
    setTimeout(function () {

        $("#mytable tbody").empty();
    }, 100
    );

    const DataValue = await axios.get('https://60db2d72801dcb0017290f38.mockapi.io/api/USER/').then((result) => {

        var data = result.data;
        $.each(data, function (i) {
            var row = "";
            row += `
            <tr id="row-tables">
              <td>${data[i].Name}</td>
              <td>${data[i].Password}</td>
              <td>${data[i].Gender}</td>
              <td>${data[i].Farm}</td>
              <td>${data[i].Permission}</td>
              <td class="td-actions">
                  <div class="action d-flex justify-content-around align-items-center" id="action">
                <a id='edit' onclick="onEdit(${data[i].id})">
                <button type="button" rel="tooltip" title="" class="btn btn-info btn-link btn-sm" data-original-title="Edit Task">
                             <i class="material-icons">edit</i>
                         <div class="ripple-container"></div></button>
                </a>
                <a id='delete' onclick="onDel(${data[i].id})">
                <button type="button" rel="tooltip" title="" class="btn btn-danger btn-link btn-sm" data-original-title="Edit Task">
                <i class="material-icons">close</i>
                 <div class="ripple-container"></div>
                 </button>
                </a>
                  </div>
              </td>
              </tr>
            `;
            $("#mytable tbody").append(row);

        });

        $('#mytable').DataTable({
            "language": language,
            "bDestroy": true,
        });

    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: error.message,
            footer: '<a href="#">Mã lỗi 404!</a>'
        })
    });



};



async function add() {
    //lấy dữ liệu từ dom thực hiện

    var Dom = {
        "Name": usn.val(),
        "Password": psw.val(),
        "Gender": gd.val(),
        "Farm": tt.val(),
        "Permission": qtc.val()
    };
    //---------------------Validate-----------------
    if ($.trim(psw.val()) === "" || $.trim(usn.val()) === "") {
        validate1 = false;
        Toast.fire({
            icon: 'error',
            title: 'Thất bại',
            text: 'Không được để trống các trường!',
        })

        if ($.trim(psw.val()) === "") {
            Toast.fire({
                icon: 'error',
                title: 'Thất bại',
                text: 'Mật khẩu không được để trống !',
            })
        }
        if ($.trim(usn.val()) === "") {
            Toast.fire({
                icon: 'error',
                title: 'Thất bại',
                text: 'Tên không được để trống !',
            })
        }

    }
    else if (!textUnique(usn.val()) || !validatePass(psw.val())) {
        validate2 = false;
        Toast.fire({
            icon: 'info',
            title: 'Cảnh báo',
            text: 'Không đúng định dạng!',
        })
        if (!validatePass(psw.val())) {
            Toast.fire({
                icon: 'info',
                title: 'Cảnh báo',
                text: 'Mật khẩu không đúng định dạng!',
            })
        }
        if (!textUnique(usn.val())) {
            Toast.fire({
                icon: 'info',
                title: 'Cảnh báo',
                text: 'Tên không đúng định dạng!',
            })
        }

    }

    //---------------------Validate thành công-----------------//

    else {
        if (IsAdd) {
            $.ajax(
                {
                    url: "https://60db2d72801dcb0017290f38.mockapi.io/api/USER/",
                    method: "POST",
                    data: Dom
                }
            ).done(function (data) {
                //đóng modal
                $('#ModalUser').modal('hide');
                Toast.fire({
                    icon: 'success',
                    title: 'Thành công !',
                    text: 'Thêm người dùng thành công!',
                })
                //hàm tải lên giao diện
                loadData();

            }).fail(function () {
                Toast.fire({
                    icon: 'error',
                    title: 'Thất bại!',
                    text: 'Thêm thông tin người dùng thất bại!',
                })
            });
        }
        else {
            //sửa dữ liệu
            $.ajax(
                {
                    url: "https://60db2d72801dcb0017290f38.mockapi.io/api/USER/" + hidden.val(),
                    method: "PUT",
                    data: Dom

                }
            ).done(function () {

                $('#ModalUser').modal('hide');
                Toast.fire({
                    icon: 'success',
                    title: 'Thành công !',
                    text: 'Sửa thông tin người dùng thành công!',
                })
                loadData();

            }).fail(
                function () {
                    Toast.fire({
                        icon: 'error',
                        title: 'Thất bại!',
                        text: 'Sửa thông tin người dùng thất bại!',
                    })
                    loadData();
                }
            );
        }
    }



}
async function onEdit(id) {//truyền id vào hàm edit
    IsAdd = false;
    await axios.get("https://60db2d72801dcb0017290f38.mockapi.io/api/USER/"+id,(data)=>{
        usn.val(data.Name);
        psw.val(data.Password);
        gd.val(data.Gender);
        tt.val(data.Farm);
        qtc.val(data.Permission);
        hidden.val(data.id);
        
    }).then((res)=>{
        $('#ModalUser').modal('show');//mở modal
    });

}
async function onDel(id) {
    question_popup.fire({
        title: 'Bạn có chắc muốn xoá?',
        text: "Bạn sẽ không thể hoàn tác!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có, xoá nó!',
        cancelButtonText: 'Không, trở lại!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax(
                {
                    url: "https://60db2d72801dcb0017290f38.mockapi.io/api/USER/" + id,
                    method: "DELETE"
                }
            ).done(function () {
                question_popup.fire(
                    {
                        icon: 'success',
                        title: 'Thành công !',
                        text: 'Xoá người dùng thành công.'
                    }

                )
                loadData();

            }).fail(function () {
                question_popup.fire(
                    {
                        icon: 'error',
                        title: 'Thất Bại !',
                        text: 'Xoá người dùng thất bại'
                    }

                )
                loadData();
            });

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            question_popup.fire(
                'An toàn',
                'Thông tin được bảo vệ',
                'info'
            )
            loadData();
        }
    })

}
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
const question_popup = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

