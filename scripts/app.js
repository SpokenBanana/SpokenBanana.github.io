$(document).ready(function() {
    var images = ['images/AR_1.png', 'images/AS_1.png', 'images/image.png', 'images/popcircle.png', 'images/sorterMerge.png',
    'images/rmg_screen.png'];
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

    var canvas = document.getElementById("canvas");
    canvas.width = 700;
    canvas.height = 500;
    var context = canvas.getContext('2d');
    var colors = ['red', 'lightcoral', 'white', 'lawngreen', 'lightblue', 'chocolate', 'navy', 'fuchsia', 'lightseagreen'];

    function createArt(x, y, width, height, amountLeft) {
        // horizontal or vertical
        if (amountLeft == 0) return;
        if (amountLeft < 3 && Math.floor(Math.random() * 100) % 14 == 0) return;
        var hOrv = Math.floor(Math.random()*100) % 2 == 0;
        var color = colors[Math.floor(Math.random()*colors.length)];
        if (hOrv) {
            context.fillStyle = color;
            context.fillRect(x, y, width, height/2);
            createArt(x, y, width, height/2, amountLeft-1);
            createArt(x, y + height/2, width, height/2, amountLeft-1);

            context.fillStyle = 'black';
            context.rect(x, y, width, height/2);
            context.lineWidth = amountLeft;
            context.stroke();
        } else {
            context.fillStyle = color;
            context.fillRect(x, y, width/2, height);
            createArt(x, y, width/2, height, amountLeft-1);
            createArt(x + width/2, y, width/2, height, amountLeft-1);

            context.fillStyle = 'black';
            context.rect(x, y, width/2, height);
            context.lineWidth = amountLeft;
            context.stroke();
        }
    }

    createArt(0, 0, canvas.width, canvas.height, 6);

});

