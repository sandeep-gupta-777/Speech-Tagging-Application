// $('.dropdown-menu a').click(function(){
$('.dropdown-menu a').click(function () {
    console.log('hello');
    $('#choose-language-button').text($(this).text());
});

$('#file').bind('change', function () {
    var fileName = '';
    fileName = $(this).val();
    $('#file-selected').html(fileName);
})