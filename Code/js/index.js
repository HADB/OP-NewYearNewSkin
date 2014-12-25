var SEG = {
    currentPage: 1,
    formData: { name: "", age: 0, phone: 0 }
};
function HideWater(nowWaterIndex) {
    if (nowWaterIndex != 6) {
        setTimeout(function () {
            $('#water-' + nowWaterIndex).addClass("fade-out");
            setTimeout(function () {
                $('#water-' + nowWaterIndex).addClass("hide");
            }, 500);
            nowWaterIndex++;
            HideWater(nowWaterIndex);
        }, 300 - nowWaterIndex * 40);
    }
}

function ShowWater(nowWaterIndex) {
    setTimeout(function () {
        if (nowWaterIndex == 6) {
            HideWater(1);
        }
        else {
            $('#water-' + nowWaterIndex).addClass("fadeIn");
            setTimeout(function () {
                $('#water-' + nowWaterIndex).removeClass("hide");
            }, 1000);
            nowWaterIndex++;
            ShowWater(nowWaterIndex);
        }
    }, 300);
}
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
            ShowWater(1);
        }, 400);

        setTimeout(function () {
            $(".page-1 .bg-black").addClass("fade-out");
        }, 1500);

        setTimeout(function () {
            $(".page-1 .bg-white").addClass("fade-in-out");
            $(".page-1 .bg-white").removeClass("hide");
        }, 2000);

        setTimeout(function () {
            $(".page-1 .bg-black").addClass("hide");
        }, 2200);

        setTimeout(function () {
            $(".page-1 .bg-white").addClass("hide");
            $(".page-1 .text-1").removeClass("hide");
            $(".page-1 .text-2").removeClass("hide");
            $(".page-1 .button-2").removeClass("hide");
        }, 3000);
    });

    $(".page-1 .button-2").click(function () {
        $(".page-1 .form").removeClass("hide");
    });

    $(".page-1 .form .age").click(function () {
        $(".page-1 .form .dropdown").removeClass("hide");
    });

    $(".form .dropdown .dropdown-age-1").click(function () {
        $(".page-1 .form .age").val("18-25岁");
        SEG.formData.age = 1;
        $(".page-1 .form .dropdown").addClass("hide");
    });
    $(".form .dropdown .dropdown-age-2").click(function () {
        $(".page-1 .form .age").val("26-35岁");
        SEG.formData.age = 2;
        $(".page-1 .form .dropdown").addClass("hide");
    });
    $(".form .dropdown .dropdown-age-3").click(function () {
        $(".page-1 .form .age").val("36-45岁");
        SEG.formData.age = 3;
        $(".page-1 .form .dropdown").addClass("hide");
    });
    $(".form .dropdown .dropdown-age-4").click(function () {
        $(".page-1 .form .age").val("45岁以上");
        SEG.formData.age = 4;
        $(".page-1 .form .dropdown").addClass("hide");
    });
    $(".form .button-3").click(function () {
        //js上传数据操作，并根据返回结果进行页面展示
        SEG.formData.phone = $(".page-1 .form .phone").val();
        SEG.formData.name = $(".page-1 .form .name").val();
        // SEG.formData.age = $(".page-1 .form .age").val();
        //$(".page-6 .phone-number").html("手机号：" + SEG.formData.phone);//为了后面显示用

        //这里发出ajax请求，并对返回的json进行判断，如果正确的话进行下面两行的操作，否则，不进行任何操作。

        $.ajax({
            "url": "../newyeartest/rexdb.php",
            //"url":" ../rexdb.php", 
            "type": "post",
            "data": { 'name': SEG.formData.name, 'agerange': SEG.formData.age, 'phone': SEG.formData.phone },
            "crossDomain": true,
            "success": function (result) {
                m = JSON.parse(result);
                if (m.resultId == "999" || m.resultId == "4" || m.resultId == "5") {
                    if (m.point == 1) {
                        showPage(2);
                        //$(".page-2").removeClass("hide");
                    }
                    else {
                        showPage(3);
                        //$(".page-3").removeClass("hide");
                    }
                }
                else {
                    if (m.resultId == "1") {
                        $(".page-1 .form .name").val("");
                        $(".page-1 .form .name").attr("placeholder", "姓名5个汉字或15个英文单词");
                        //alert(m.resultName);
                    }
                    else if (m.resultId == "6") {
                        //SEG.formData.age = 1;
                        $(".page-1 .form .age").val("");
                        $(".page-1 .form .age").attr("placeholder", "请选择年龄");
                    }

                    else {
                        $(".page-1 .form .phone").val("");
                        $(".page-1 .form .phone").attr("placeholder", "手机号码不正确");
                    }
                }
            }
        })

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
