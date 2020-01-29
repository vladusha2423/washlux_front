let buttons = document.getElementsByClassName('btn');
let i = 0;
let obj;
let table_hat = ['Услуга', 'Продолжительность \nвыполнения <br>услуги', 'Седан, \nХэтчбек,<br>Купе',
    'Кроссовер, Малый джип,  Универсал', 'Джип, Пикап, Компактвэн, Большой кроссовер', 'Минивэн',
    'Микро-автобус, Газель'];
let arr = {'pr-1': 'https://dvvdev.ru/api/rows/BaseServices',
        'pr-2': 'https://dvvdev.ru/api/rows/LuxSilver',
        'pr-3': 'https://dvvdev.ru/api/rows/LuxGold',
        'pr-4': 'https://dvvdev.ru/api/rows/LuxPremium',
        'pr-5': 'https://dvvdev.ru/api/rows/Defence',
        'pr-6': 'https://dvvdev.ru/api/rows/drycleaning',
        'pr-7': 'https://dvvdev.ru/api/rows/premiumdetailing'};
$(document).ready(function(){
    $('#pr-1').addClass('active');
    getData('pr-1');
    $('#pr-1').click(function(){
        $(this).addClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-6').removeClass('active');
        $('#pr-7').removeClass('active');
        getData($(this).attr('id'));
    });
    $('#pr-2').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-6').removeClass('active');
        $('#pr-7').removeClass('active');
        getData($(this).attr('id'));
    });
    $('#pr-3').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-6').removeClass('active');
        $('#pr-7').removeClass('active');
        getData($(this).attr('id'));
    });
    $('#pr-4').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-6').removeClass('active');
        $('#pr-7').removeClass('active');
        getData($(this).attr('id'));
    });
    $('#pr-5').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-6').removeClass('active');
        $('#pr-7').removeClass('active');
        getData($(this).attr('id'));
    });
    $('#pr-6').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-7').removeClass('active');
        getData($(this).attr('id'));
    });
    $('#pr-7').click(function(){
        $(this).addClass('active');
        $('#pr-1').removeClass('active');
        $('#pr-2').removeClass('active');
        $('#pr-3').removeClass('active');
        $('#pr-4').removeClass('active');
        $('#pr-5').removeClass('active');
        $('#pr-6').removeClass('active');
        getData($(this).attr('id'));
    });
    function getData(id){
        let spin = $('.container-spin');
        spin.css({display: "flex"});
        spin.animate({
            opacity: 1
        },function(){
            $.get(arr[id], function(data) {
                console.log(data);
                create_table(data);
                $('.container-spin').animate({
                    opacity: 0
                },function(){
                    $('.container-spin').hide();
                });
            });
        });
    }
    function create_table(obj){
        $('#table').empty();
        $('#table').append(`<div class="row">
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
                $('#table').append(`<div class="title">${ obj[k].name }</div>`)
            }
            else{
                $('#table').append(`<div class="row"></div>`);
                $(`#table .row:last-child`).append(`<div class="row-name-container">`);
                if (obj[k].type == 'Service'){
                    $('#table .row:last-child .row-name-container').append(`<div class="row-name">${obj[k].name}</div>
                                                                                        <div class="hidden">
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
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].time }</div>`);
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].sedan }</div>`);
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].universal }</div>`);
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].jeep }</div>`);
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].minivan }</div>`);
                $('#table .row:last-child').append(`<div class="first-column">${ obj[k].van }</div>`);
                //$('#table').append('</div>');
            }
        }
        display_values();
    }
});
function display_values(){
    if (document.body.clientWidth <= '768'){
        console.log(1234567890)
        $('.row-name').click(function(){
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