$(document).ready(function() {
    var images = ['images/AR_1.png', 'images/AS_1.png', 'images/image.png', 'images/popcircle.png', 'images/sorterMerge.png',
    'images/screenrmg.png'];
    var title =  ['RegexFractals', 'AsteriodPathFinder', 'ImagePalette', 'PhysicsOnPaper', 'Vision Sorter',
    'RateMyGenie'];

    setInterval(function(){
        $('#highlight-image').fadeOut(500, function(){
            $(this).load(function(){
                $(this).fadeIn(500);
            });
            $(this).attr('src', images[0]);
            images.unshift(images.pop());

        });
        $('#project-name').fadeOut(500, function(){
            $('#project-name').text(title[0]);
            title.unshift(title.pop());
        }).fadeIn(500);
    }, 10 * 1000);

    $('.highlights').mousemove(function(event) {
        var obj = $(this);
        var offset = obj.offset();
        var x = event.pageX - offset.left;
        var y = event.pageY - offset.top;
        obj.css('background-color', 'rgb(' + Math.floor(255 * (x / obj.width())).toString() + ',255,'+
                Math.floor(255 * (y / obj.height())) + ')');
    });

});

