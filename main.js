


$(document).ready(function(){

    $('button').click(function(){
        $(this).blur();
    });

    $('input').keypress(function (e) {
        if (e.which == 13) {
            doSearch();
            //return false;
        }
    });

    $('.finishsearchbtn').click(function(){
        doSearch();
    });
});

function doSearch(){
    if($('input').val() != ""){
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch=" + escape($('input').val()) + "&utf8=",
        type: "GET",
        success: function (data) {            
            var results = data.query.search;
            for(var i = 0; i < results.length; i++){
                var title = results[i].title;
                var snippet = results[i].snippet;
                var masterSr = $('#sr' + (i + 1).toString());
                masterSr.children().children().find('h2').html(title.toUpperCase());
                masterSr.children().children().find('p').html(snippet);
                masterSr.children().attr('href', 'https://en.wikipedia.org/?curid=' + results[i].pageid);
            }
            $('.results-jumbo').css('display', 'block');
        },
        xhrFields: {
            withCredentials: false
        }
    });
    }
}



function openInNewTab(url){
    var win = window.open(url, '_blank');
    win.focus();
}
