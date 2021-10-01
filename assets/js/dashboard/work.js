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
    "zeroRecords": "Không tìm thấy công việc nào",
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
var muavu = $("#muavu");
var ngaybd = $("#ngaybd");
var ngaykt = $("#ngaykt");
var tt = $("#tt");
var mota = $("#mota");
var nguoith = $("#nguoith");
var mota = $("#mota");

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

    const DataValue = await axios.get('https://60db2d72801dcb0017290f38.mockapi.io/api/work/').then((result) => {

        var data = result.data;
        $.each(data, function (i) {
            var row = "";
            row += `
            <tr id="row-tables">
                <td>${data[i].TenCv}</td>
                <td>${data[i].TenMv}</td>
                <td>${data[i].NgayBD}</td>
                <td>${data[i].NgayKT}</td>
                <td>${data[i].Status}</td>
                <td>${data[i].Mota}</td>
                <td>${data[i].NguoiLam}</td>
                <td class="td-actions">
                    <div class="action d-flex justify-content-around align-items-center" id="action">
                    <a id='edit' onclick="onEdit(${data[i].id})">
                    <button type="button" rel="tooltip" title="" class="btn btn-info btn-link btn-sm" data-original-title="Edit Task">
                             <i class="material-icons">edit</i>
                         <div class="ripple-container"></div></button>
                    </a>
                    <a id='delete' onclick="onDel(${data[i].id})">
                    <button type="button" rel="tooltip" title="" class="btn btn-danger btn-link btn-sm" data-original-title="Delete Task">
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
        "TenCv": usn.val(),
        "TenMv": muavu.val(),
        "NgayBD": ngaybd.val(),
        "NgayKT": ngaykt.val(),
        "Status": tt.val(),
        "Mota": mota.val(),
        "NguoiLam": nguoith.val()
    };



    if (IsAdd) {
        $.ajax(
            {
                url: "https://60db2d72801dcb0017290f38.mockapi.io/api/work/",
                method: "POST",
                data: Dom
            }
        ).done(function (data) {
            //đóng modal
            $('#ModalWork').modal('hide');
            Toast.fire({
                icon: 'success',
                title: 'Thành công !',
                text: 'Thêm công việc thành công!',
            })
            //hàm tải lên giao diện
            loadData();

        }).fail(function () {
            Toast.fire({
                icon: 'error',
                title: 'Thất bại!',
                text: 'Thêm thông tin công việc thất bại!',
            })
        });
    }
    else {
        //sửa dữ liệu
        $.ajax(
            {
                url: "https://60db2d72801dcb0017290f38.mockapi.io/api/work/" + hidden.val(),
                method: "PUT",
                data: Dom

            }
        ).done(function () {

            $('#ModalWork').modal('hide');
            Toast.fire({
                icon: 'success',
                title: 'Thành công !',
                text: 'Sửa thông tin công việc thành công!',
            })
            loadData();

        }).fail(
            function () {
                Toast.fire({
                    icon: 'error',
                    title: 'Thất bại!',
                    text: 'Sửa thông tin công việc thất bại!',
                })
                loadData();
            }
        );
    }




}
async function onEdit(id) {//truyền id vào hàm edit
    IsAdd = false;
    $.get("https://60db2d72801dcb0017290f38.mockapi.io/api/work/" + id, function (data, status) {
        //gán dữ liệu vào các trường input
        usn.val(data.TenCv);
        muavu.val(data.TenMv);
        ngaybd.val(data.NgayBD);
        ngaykt.val(data.NgayKT);
        tt.val(data.Status);
        mota.val(data.Mota);
        nguoith.val(data.NguoiLam);
        hidden.val(data.id);
        $('#ModalWork').modal('show');//mở modal
    })

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
                    url: "https://60db2d72801dcb0017290f38.mockapi.io/api/work/" + id,
                    method: "DELETE"
                }
            ).done(function () {
                question_popup.fire(
                    {
                        icon: 'success',
                        title: 'Thành công !',
                        text: 'Xoá công việc thành công.'
                    }

                )
                loadData();

            }).fail(function () {
                question_popup.fire(
                    {
                        icon: 'error',
                        title: 'Thất Bại !',
                        text: 'Xoá công việc thất bại'
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

