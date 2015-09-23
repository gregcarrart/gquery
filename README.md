# ghettoQuery

A light weight solution mimicking jQuery selectors and a few methods.

## Usage

#### $(selectors):
$('.class') or $('#id')

#### $.each(selector, callback):

$.each($('.class'), function(index, selector) {
    //your code here
});

#### $.css({Object}):

$('#id').css({
   'background-image': 'url(path/to/image.jpg)',
   'color': '#000'
});

#### $.on(eventType, callback):

$(selector).on('click', function() {
   //your code here
});

## Examples
var array = ['a', 'b', 'c', 'd'];

$.each(array, function() {
    //attach a click event to each element!
    $('#id-'+i).on('click', someMethod());

    //add a 1px black border to each element!
    $('#id-'+i).css({'border': '1px solid #000'});
    
    //chaining is not supported yet!
});

function someMethod () {
    console.log('whoa look!');
}
