let api = {
    isAuth: function(){
        $.ajax(
            {
                type: 'GET',
                url: 'https://dvvdev.ru/api/isAuth',
                beforeSend: function(request) { // в хедерах передаем токен
                    request.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("Token")}`);
                },
                dataType: "json",
                contentType: "application/json",
                success: function (data, textStatus) {
                    console.log(data);
                }
            })
            .fail(function(ex){
                document.location.href = 'login.html';
            });
    }
};

//Проверяем токен
api.isAuth();

$('.nav-mobile-trigger i').click(function(){
    localStorage.removeItem('Token');
    document.location.href = 'login.html';
});

if(localStorage.getItem('Table') === null)
    localStorage.setItem('Table', 'BaseServices');
let buttons = document.getElementsByClassName('btn');
let i = 0;
let obj;
let table_hat = ['Услуга', 'Продолжительность \nвыполнения <br>услуги', 'Седан, \nХэтчбек,<br>Купе',
    'Кроссовер, Малый джип,  Универсал', 'Джип, Пикап, Компактвэн, Большой кроссовер', 'Минивэн',
    'Микро-автобус, Газель'];
let arr = { 'pr-1': 'BaseServices',
            'pr-2': 'LuxSilver',
            'pr-3': 'LuxGold',
            'pr-4': 'LuxPremium',
            'pr-5': 'Defence',
            'pr-6': 'DryCleaning',
            'pr-7': 'PremiumDetailing'};
$(document).ready(function(){
    for(let key in arr)
        if(arr[key] === localStorage.getItem('Table')) {
            $('#' + key).addClass('active');
            getData(arr[key]);
        }
    $('#pr-1').click(function(){
        $(this).addClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-6').removeClass('active');
        $('#pr-7').removeClass('active');
        getData(arr[$(this).attr('id')]);
    });
    $('#pr-2').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-6').removeClass('active');
        $('#pr-7').removeClass('active');
        getData(arr[$(this).attr('id')]);
    });
    $('#pr-3').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-6').removeClass('active');
        $('#pr-7').removeClass('active');
        getData(arr[$(this).attr('id')]);
    });
    $('#pr-4').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-6').removeClass('active');
        $('#pr-7').removeClass('active');
        getData(arr[$(this).attr('id')]);
    });
    $('#pr-5').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-6').removeClass('active');
        $('#pr-7').removeClass('active');
        getData(arr[$(this).attr('id')]);
    });
    $('#pr-6').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-7').removeClass('active');
        getData(arr[$(this).attr('id')]);
    });
    $('#pr-7').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-6').removeClass('active');
        getData(arr[$(this).attr('id')]);
    });
    function getData(table){
        localStorage.setItem('Table', table);
        let spin = $('.container-spin');
        spin.css({display: "flex"});
        spin.animate({
            opacity: 1
        }, function(){
            $.get('https://dvvdev.ru/api/rows/' + table, function(data) {
                console.log(data);
                create_table(data);
                $('.container-spin').animate({
                    opacity: 0
                },function(){
                    $('.container-spin').hide();
                });
                return data;
            }).fail(function(){
                alert('Не удалось загрузить данные. Проверьте подключение к интернету.')
            });

        });
    }
    let flag = false;
    function create_table(obj){
        $('#table').empty();
        unbindEvents();
        $('#table').append(`<div class="row-title">
                                    <div class="row-name-container">
                                        <div class="row-name-title">${table_hat[0]}</div>
                                    </div>
                                    <div class="first-column-title">${table_hat[1]}</div>
                                    <div class="first-column-title">${table_hat[2]}</div>
                                    <div class="first-column-title">${table_hat[3]}</div>
                                    <div class="first-column-title">${table_hat[4]}</div>
                                    <div class="first-column-title">${table_hat[5]}</div>
                                    <div class="first-column-title">${table_hat[6]}</div>
                                </div>`);
        //$('#table').append(`<div class="title">${ key }</div>`);
        for(var k = 0; k < obj.length; k++){
            if (obj[k].type === "Title"){
                $('#table').append(`
                <div class="row row-name-temp">
                    <div class="title">${ obj[k].name }</div>
                </div>
                <div class="hidden">
                    <div class="min-row">
                        <div class="min-row-edit" id="${ obj[k].id }-${ obj[k].pos }">
                            <a href="#row-add-modal" uk-toggle><i class="fas fa-plus row-add"></i></a>
                            <a href="#row-add-modal" uk-toggle><i class="fas fa-edit row-update"></i></a>
                            <div><i class="fas fa-trash-alt row-delete"></i></div>
                            <div><i class="fas fa-chevron-up row-up"></i></div>
                            <div><i class="fas fa-chevron-down row-down"></i></div>
                        </div>
                    </div>
                </div>
                `);
                $('#table .row:last-child').prepend(`
                                            <div class="row-edit" id="${ obj[k].id }-${ obj[k].pos }">
                                                <a href="#row-add-modal" uk-toggle><i class="fas fa-plus row-add"></i></a>
                                                <a href="#row-add-modal" uk-toggle><i class="fas fa-edit row-update"></i></a>
                                                <div><i class="fas fa-trash-alt row-delete"></i></div>
                                                <div><i class="fas fa-chevron-up row-up"></i></div>
                                                <div><i class="fas fa-chevron-down row-down"></i></div>
                                            </div>
                                            `);
            }
            else{
                $('#table').append(`<div class="row"></div>`);
                $(`#table .row:last-child`).append(`<div class="row-name-container">`);
                if (obj[k].type == 'Service'){
                    $('#table .row:last-child .row-name-container').append(`<div class="row-name">${obj[k].name}</div>
                                                                                        <div class="hidden">
                                                                                            <div class="min-row">
                                                                                                <div class="min-row-edit" id="${ obj[k].id }-${ obj[k].pos }">
                                                                                                    <a href="#row-add-modal" uk-toggle><i class="fas fa-plus row-add"></i></a>
                                                                                                    <a href="#row-add-modal" uk-toggle><i class="fas fa-edit row-update"></i></a>
                                                                                                    <div><i class="fas fa-trash-alt row-delete"></i></div>
                                                                                                    <div><i class="fas fa-chevron-up row-up"></i></div>
                                                                                                    <div><i class="fas fa-chevron-down row-down"></i></div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[1]}</div>
                                                                                                <div class="min-value">${obj[k].time}</div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[2]}</div>
                                                                                                <div class="min-value">${obj[k].sedan}</div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[3]}</div>
                                                                                                <div class="min-value">${obj[k].universal}</div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[4]}</div>
                                                                                                <div class="min-value">${obj[k].jeep}</div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[5]}</div>
                                                                                                <div class="min-value">${obj[k].minivan}</div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[6]}</div>
                                                                                                <div class="min-value">${obj[k].van}</div>
                                                                                            </div>
                                                                                        </div>`);
                }
                else{
                    for(var i = 0; i < obj[k].names.length; i++){
                        $('#table .row:last-child .row-name-container').append(`<div class="row-name">${obj[k].names[i]}</div>
                                                                                        <div class="hidden">
                                                                                            <div class="min-row">
                                                                                                <div class="min-row-edit" id="${ obj[k].id }-${ obj[k].pos }">
                                                                                                    <a href="#row-add-modal" uk-toggle><i class="fas fa-plus row-add"></i></a>
                                                                                                    <a href="#row-add-modal" uk-toggle><i class="fas fa-edit row-update"></i></a>
                                                                                                    <div><i class="fas fa-trash-alt row-delete"></i></div>
                                                                                                    <div><i class="fas fa-chevron-up row-up"></i></div>
                                                                                                    <div><i class="fas fa-chevron-down row-down"></i></div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[1]}</div>
                                                                                                <div class="min-value">${obj[k].time}</div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[2]}</div>
                                                                                                <div class="min-value">${obj[k].sedan}</div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[3]}</div>
                                                                                                <div class="min-value">${obj[k].universal}</div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[4]}</div>
                                                                                                <div class="min-value">${obj[k].jeep}</div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[5]}</div>
                                                                                                <div class="min-value">${obj[k].minivan}</div>
                                                                                            </div>
                                                                                            <div class="min-row">
                                                                                                <div class="min-name">${table_hat[6]}</div>
                                                                                                <div class="min-value">${obj[k].van}</div>
                                                                                            </div>
                                                                                        </div>`);
                    };
                }
                $('#table .row:last-child').append('</div>');
                $('#table .row:last-child').prepend(`
                                            <div class="row-edit" id="${ obj[k].id }-${ obj[k].pos }">
                                                <a href="#row-add-modal" uk-toggle><i class="fas fa-plus row-add"></i></a>
                                                <a href="#row-add-modal" uk-toggle><i class="fas fa-edit row-update"></i></a>
                                                <div><i class="fas fa-trash-alt row-delete"></i></div>
                                                <div><i class="fas fa-chevron-up row-up"></i></div>
                                                <div><i class="fas fa-chevron-down row-down"></i></div>
                                            </div>
                                            `);
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].time }</div>`);
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].sedan }</div>`);
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].universal }</div>`);
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].jeep }</div>`);
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].minivan }</div>`);
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].van }</div>`);
            }

        }
        addEvents();
        display_values();
    }
    function addEvents(){
        $('.row-add').click(function(){
            sessionStorage.setItem('Response', 'POST');
            sessionStorage.setItem('Pos', $(this).parent().parent().attr('id').split('-')[1]);
            $('.row-add-name').val('');
            $('#time').val('');
            $('#sedan').val('');
            $('#universal').val('');
            $('#jeep').val('');
            $('#minivan').val('');
            $('#van').val('');
        });
        $('.row-update').click(function(){
            sessionStorage.setItem('Response', 'PUT');
            let idPos = $(this).parent().parent().attr('id').split('-');
            sessionStorage.setItem('Pos', idPos[1]);
            sessionStorage.setItem('Id', idPos[0]);
            $.get('https://dvvdev.ru/api/rows/id/' + idPos[0], function(data) {
                console.log(data);
                console.log(data.name);
                if(data.type === "Title"){
                    document.querySelectorAll('.row-add-radio-input')[2].checked = true;
                    $('.uk-form-label i').css({ display: "none" });
                    $('.row-add-name-inputs > div').hide();
                    $('.row-add-name-inputs > .first').show();
                    $('#time-container').hide();
                    $('#sedan-container').hide();
                    $('#universal-container').hide();
                    $('#jeep-container').hide();
                    $('#minivan-container').hide();
                    $('#van-container').hide();
                    $('.row-add-name').attr('value', data.name);
                }
                else if(data.type === "MultiService"){
                    document.querySelectorAll('.row-add-radio-input')[1].checked = true;
                    $('.row-add-name-inputs > div').remove();
                    for(let i = 0; i < data.names.length; i++)
                        $('.row-add-name-inputs').append(`
                            <div class="uk-flex-inline uk-flex-left uk-flex-middle ${ i === 0 ? 'first' : '' }">
                                <div class="uk-form-controls">
                                    <input class="uk-input row-add-name" type="text" placeholder="Title" value="${ data.names[i] }">
                                </div>
                            </div>
                        `);
                    $('.uk-form-label i').css({
                        display: "inline-block"
                    });
                    $('#time-container').show();
                    $('#sedan-container').show();
                    $('#universal-container').show();
                    $('#jeep-container').show();
                    $('#minivan-container').show();
                    $('#van-container').show();
                    $('#time').val(data.time);
                    $('#sedan').val(data.sedan);
                    $('#universal').val(data.universal);
                    $('#jeep').val(data.jeep);
                    $('#minivan').val(data.minivan);
                    $('#van').val(data.van);
                }
                else{
                    document.querySelectorAll('.row-add-radio-input')[0].checked = true;
                    $('.uk-form-label i').css({ display: "none" });
                    $('.row-add-name-inputs > div').hide();
                    $('.row-add-name-inputs > .first').show();
                    $($('.row-add-name')[0]).val(data.name);
                    $('#time').val(data.time);
                    $('#sedan').val(data.sedan);
                    $('#universal').val(data.universal);
                    $('#jeep').val(data.jeep);
                    $('#minivan').val(data.minivan);
                    $('#van').val(data.van);
                }
            });

        });
        $('.row-delete').click(function(){
            $.ajax(
                {
                    type: 'DELETE',
                    url: 'https://dvvdev.ru/api/rows/' + $(this).parent().parent().attr('id').split('-')[0],
                    beforeSend: function (request) { // в хедерах передаем токен
                        request.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("Token")}`);
                    },
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        console.log('Successfully deleted!');
                        console.log(data);
                        getData(localStorage.getItem('Table'));
                    }
                })
                .fail(function (ex) {
                    console.log('Something wrong!');
                    console.log(ex);
                });
        });
        $('.row-down').click(function(){
            $.ajax(
                {
                    type: 'GET',
                    url: 'https://dvvdev.ru/api/rows/up/' + $(this).parent().parent().attr('id').split('-')[0],
                    beforeSend: function (request) { // в хедерах передаем токен
                        request.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("Token")}`);
                    },
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        console.log('Successfully putted up!');
                        console.log(data);
                        getData(localStorage.getItem('Table'));
                    }
                })
                .fail(function (ex) {
                    console.log('Something wrong!');
                    console.log(ex);
                });
        });
        $('.row-up').click(function(){
            $.ajax(
                {
                    type: 'GET',
                    url: 'https://dvvdev.ru/api/rows/down/' + $(this).parent().parent().attr('id').split('-')[0],
                    beforeSend: function (request) { // в хедерах передаем токен
                        request.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("Token")}`);
                    },
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        console.log('Successfully putted up!');
                        console.log(data);
                        getData(localStorage.getItem('Table'));
                    }
                })
                .fail(function (ex) {
                    console.log('Something wrong!');
                    console.log(ex);
                });
        });
        $('.row-add-name-input').click(function(){
            $('.row-add-name-inputs').append(`
                <div class="uk-flex-inline uk-flex-left uk-flex-middle">
                    <div class="uk-form-controls">
                        <input class="uk-input row-add-name" type="text" placeholder="Title">
                    </div>
                </div>
            `);
        });
        $('.row-remove-name-input').click(function(){
            $('.row-add-name-inputs > div:last-child').remove();
        });
        $(".row-add-radio-input").click(function(){
            console.log($(this));
            let radioValue = $(this).attr('value');
            if(radioValue === 'MultiService'){
                $('.row-add-name-inputs > div').show();
                $('.uk-form-label i').css({
                    display: "inline-block"
                });
                $('#time-container').show();
                $('#sedan-container').show();
                $('#universal-container').show();
                $('#jeep-container').show();
                $('#minivan-container').show();
                $('#van-container').show();
            }
            else{
                $('.uk-form-label i').css({
                    display: "none"
                });
                $('.row-add-name-inputs > div').hide();
                $('.row-add-name-inputs > .first').show();
                if(radioValue === 'Title'){
                    $('#time-container').hide();
                    $('#sedan-container').hide();
                    $('#universal-container').hide();
                    $('#jeep-container').hide();
                    $('#minivan-container').hide();
                    $('#van-container').hide();
                }
                else{
                    $('#time-container').show();
                    $('#sedan-container').show();
                    $('#universal-container').show();
                    $('#jeep-container').show();
                    $('#minivan-container').show();
                    $('#van-container').show();
                }
            }
        });
        $('#row-add-form').on('submit', function(){
            let postData = {
                "Pos": Number(sessionStorage.getItem('Pos')) + 1,
                "Type": $(":radio[name='row-add-type']:checked").attr('value'),
                "Table": localStorage.getItem('Table')
            };
            if(postData.Type === 'Title' || postData.Type === 'Service')
                postData["Name"] = $('.row-add-name').val();
            else{
                let names = [];
                let addName = $('.row-add-name');
                for(let i = 0; i < addName.length; i++)
                    names.push($(addName[i]).val());
                postData["Names"] = names;
            }
            if(postData.Type === 'Service' || postData.Type === 'MultiService'){
                postData["Time"] = $('#time').val();
                postData["Sedan"] = $('#sedan').val();
                postData["Universal"] = $('#universal').val();
                postData["Jeep"] = $('#jeep').val();
                postData["Minivan"] = $('#minivan').val();
                postData["Van"] = $('#van').val();
            }
            console.log(postData);
            if(sessionStorage.getItem('Response') === 'POST') {
                console.log('ADDADDADDADD');
                $.ajax(
                    {
                        type: 'POST',
                        url: 'https://dvvdev.ru/api/rows',
                        beforeSend: function (request) { // в хедерах передаем токен
                            request.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("Token")}`);
                        },
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(postData),
                        success: function (data) {
                            console.log('Successfully added!');
                            console.log(data);
                            getData(localStorage.getItem('Table'));
                        }
                    })
                    .fail(function (ex) {
                        console.log('Something wrong!');
                        console.log(ex);
                    });
            }
            else {
                postData["Id"] = sessionStorage.getItem('Id');
                $.ajax(
                    {
                        type: 'PUT',
                        url: 'https://dvvdev.ru/api/rows',
                        beforeSend: function (request) { // в хедерах передаем токен
                            request.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("Token")}`);
                        },
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(postData),
                        success: function (data) {
                            console.log('Successfully updated!');
                            console.log(data);
                            getData(localStorage.getItem('Table'));
                        }
                    })
                    .fail(function (ex) {
                        console.log('Something wrong!');
                        console.log(ex);
                    });
            }

            return false;
        });
        flag = true;
    }
    function unbindEvents(){
        $('.row-add').unbind();
        $('.row-update').unbind();
        $('.row-delete').unbind();
        $('.row-down').unbind();
        $('.row-up').unbind();
        $('.row-add-name-input').unbind();
        $('.row-remove-name-input').unbind();
        $(".row-add-radio-input").unbind();
        $('#row-add-form').unbind();
    }
});

function display_values(){
    if (document.body.clientWidth <= '768'){
        console.log(1234567890)
        $('.row-name, .row-name-temp').click(function(){
            if ($(this).next().hasClass('hidden')){
                $(this).next().addClass('min-container');
                $(this).next().removeClass('hidden');
                console.log(99999999999)
            }
            else{
                $(this).next().addClass('hidden');
                $(this).next().removeClass('min-container');
                console.log(11111111111)
            }
        })
    }
}