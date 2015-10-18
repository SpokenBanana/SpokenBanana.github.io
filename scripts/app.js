$(document).ready(function() {
    var images = ['images/AR_1.png', 'images/AS_1.png', 'images/image.png', 'images/popcircle.png', 'images/sorterMerge.png'];
    var title =  ['RegexFractals', 'AsteriodPathFinder', 'ImagePallete', 'PhysicsOnPaper', 'Vision Sorter'];

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

});

