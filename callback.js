var form = document.getElementsByTagName('form');
const chatid = "";//Вставляете здесь ИД чата
const token = "";//Вставляете здесь api токен вашего бота

for(var i of form){
    i.addEventListener("submit",createText);
}

function createText(e){
    e.preventDefault();
    var text = '';
    var fills = this.querySelectorAll('input');
    var selected = this.querySelector('.radio-checkbox:checked'); //поиск в форме чекбокса
    var hideInp = this.querySelector('.inputHide');//поиск в форме скрытого инпута
// Проверка на наличие скрытых инпутов
    if (hideInp){
        hideInp = hideInp.getAttribute('name');
        text += hideInp+'\n';
    }
// Проверка на наличие скрытых чекбокса
    if(selected){
        selected = selected.value;
        text += selected+'\n';
    };

    for (var fill of fills){
        if(fill.classList.contains('form_field')){
            var name = fill.getAttribute('data-name')
            var value = fill.value
            text += name+value+'\n';
        }
    };

    sendMessage(token,text,chatid);
    this.reset()
}

function sendMessage(token,text,chatid){
    $.ajax({  
    type: "POST",  
    url: "https://api.telegram.org/bot"+token+"/sendMessage?chat_id="+chatid,
    data: "parse_mode=HTML&text="+encodeURIComponent(text),
        beforeSend: function() {
            $('.modal_load').show();
            $('.error').remove();
            $('.succes').remove();
        },
        success: function() {
            $('.loader').remove();           
            $('<div class="succes">Ваша заявка отправлена</div>').prependTo('.modal_load');
        },
        error: function() {
            $('.loader').remove();
            $('<div class="error">Ошибка отправки заявки. Перезвоните нам"<br>"8 (983) 209-12-80</div>').prependTo('.modal_load');    
        },
        complete: function() {
            setTimeout(function() {
                $('.modal_load').remove()
            }, 2000);
        },
    }); 
};