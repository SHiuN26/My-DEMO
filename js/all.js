//氣象授權碼
//CWB-FCE97AC9-3ED8-4811-BA23-2C1229A1EA5F
const wurl =
    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-FCE97AC9-3ED8-4811-BA23-2C1229A1EA5F&locationName=%E6%9D%BF%E6%A9%8B";
const iurl =
    "https://api.unsplash.com/photos/?client_id=3tR5SkKPk0AuZJdjOpflbK9mFgeFGT_C5UddKNq_K9I";

$(document).ready(function () {
    const swiper = new Swiper(".swiper", {
        direction: "horizontal",
        loop: true,
        speed: 1000,
        pagination: {
            el: ".swiper-pagination",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 1500,
        },
        observer:true, //注意!!!!!!當改變swiper的樣式（隱藏/顯示）或者修改swiper的子元素時，自動初始化swiper。很重要，沒加的話無法自動撥放
    });
    $(function () {
        $(document).scroll(function () {
            var header = $(".header-wrap");
            header.toggleClass("scrolled", $(this).scrollTop() > header.height());
            $(".header-wrap").css("color", "black");
            var nav = $(".nav-a");
            nav.toggleClass("scrolled", $(this).scrollTop() > nav.height());
            var weather = $(".weather");
            weather.toggleClass("scrolled", $(this).scrollTop() > weather.height());
        });
    });
    $.ajax({
        url: wurl,
        method: "GET",
        success: function (response) {
            var city = response.records.location[0].parameter[0].parameterValue;
            var country = response.records.location[0].parameter[2].parameterValue;
            var temp = response.records.location[0].weatherElement[3].elementValue;
            var tempall = `${city}${country}<br>氣溫 ${temp}°C`;

            const weather = document.getElementById("ss");
            weather.innerHTML = tempall;
        }, //成功取得回傳時的事件
        error: function (response) {
            console.log("資料取得失敗 回去檢討檢討");
        },//失敗事件,
    });
    $.ajax({
        url: iurl,
        type: "GET",
        success: function (response) {
            let data = response;
            // console.log(data);
            
            for (let i = 0; i < data.length; i++) {
                let url = data[i].urls.regular;
                $('.swiper-wrapper').append(`<div class='swiper-slide'><img class='swiper-img' src="${url}"></div>`);
                // $('.swiper-wrapper').append(`<div><img class='swiper-img' src="${url}"></div>`);
            }
            
        },
        error: function (response) {
            console.log("取得失敗");
        },
    });
    
});

