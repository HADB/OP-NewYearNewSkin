var SEG = {
    currentPage: 1,
    formData: { name: "", age: 0, phone: 0 }
};

$(function () {
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);

    $(".page-1 .oil-3").click(function () {
        $(".page-1 .hand").addClass("hide");
        $(".page-1 .button-1").addClass("hide");
        $(".page-1 .oil-1").addClass("scale-to-up");
        $(".page-1 .oil-2").addClass("scale-to-up");
        $(".page-1 .oil-3").addClass("oil-drop-down-scale");
        $(".page-1 .oil-4").addClass("oil-drop-down");
        setTimeout(function () {
            $(".page-1 .bg-black").addClass("fade-out");
        }, 1000);
        setTimeout(function () {
            $(".page-1 .bg-white").addClass("fade-in");
            $(".page-1 .bg-white").removeClass("hide");
        }, 1500);

        setTimeout(function () {
            $(".page-1 .text-1").removeClass("hide");
            $(".page-1 .text-2").removeClass("hide");
            $(".page-1 .button-2").removeClass("hide");
        }, 2500);
    });

    $(".page-1 .button-2").click(function () {
        $(".page-1 .form").removeClass("hide");
    });

    $(".page-1 .form .age").click(function () {
        $(".page-1 .form .dropdown").removeClass("hide");
    });

    $(".form .dropdown .dropdown-age-1").click(function () {
        $(".page-1 .form .age").val("18-25岁");
        $(".page-1 .form .dropdown").addClass("hide");
    });
    $(".form .dropdown .dropdown-age-2").click(function () {
        $(".page-1 .form .age").val("26-35岁");
        $(".page-1 .form .dropdown").addClass("hide");
    });
    $(".form .dropdown .dropdown-age-3").click(function () {
        $(".page-1 .form .age").val("36-45岁");
        $(".page-1 .form .dropdown").addClass("hide");
    });
    $(".form .dropdown .dropdown-age-4").click(function () {
        $(".page-1 .form .age").val("45岁以上");
        $(".page-1 .form .dropdown").addClass("hide");
    });
    $(".form .button-submit").click(function () {
        //js上传数据操作，并根据返回结果进行页面展示
        showPage(2);
        //showPage(3);
    });
});


function showPage(pageNumber) {
    var outClass = "ani-fadeOut";
    var inClass = "ani-fadeIn";

    $(".page-" + SEG.currentPage).addClass(outClass);
    setTimeout(function () {
        $(".page-" + SEG.currentPage).addClass("hide");
        $(".page-" + SEG.currentPage).removeClass(outClass);
        window.scrollTo(0, 0);
        $(".page-" + pageNumber).addClass(inClass);
        $(".page-" + pageNumber).removeClass("hide");

        setTimeout(function () {
            $(".page-" + pageNumber).removeClass(inClass);
        }, 600);
        SEG.currentPage = pageNumber;
    }, 600);
}
