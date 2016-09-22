$(document).ready(function() {
    var images = ['images/AR_1.png', 'images/AS_1.png', 'images/image.png', 'images/popcircle.png', 'images/sorterMerge.png',
    'images/rmg_screen.png'];
    var title =  ['RegexFractals', 'AsteriodPathFinder', 'ImagePalette', 'PhysicsOnPaper', 'Vision Sorter',
    'RateMyGenie'];

	var clouds = [];

	function Cloud() {
		this.div = $("<img src='images/cloud.png'/>");
		this.div.addClass("cloud");

		this.x = 50 + Math.floor(Math.random() * 1700);
		this.y = 50 + Math.floor(Math.random() * 500);

		this.maxOpacity = Math.random();
		this.div.css({left: this.x, top: this.y, opacity: 0, width: 100, height: 51});
		// this.div.css("background-image", "url(images/cloud.png");
		this.speedx = 1 + Math.floor(Math.random() * 2);
		this.aliveTime = 50 + Math.floor(Math.random() * 300);
		this.increaseOpacityTime = this.aliveTime * .25;
		this.decreaseOpcacityTime = this.aliveTime - this.increaseOpacityTime;
		this.time = 0;

		$("#content").append(this.div);

		this.update = function() {
			this.time++;
			if (this.time < this.increaseOpacityTime) {
				this.div.css({opacity: (this.time/parseFloat(this.increaseOpacityTime))*this.maxOpacity});
			}
			if (this.time >= this.decreaseOpcacityTime && this.time <= this.aliveTime) {
				this.div.css({opacity: ((this.aliveTime - this.time)/parseFloat(this.increaseOpacityTime))*this.maxOpacity});
			}
			if (this.time >= this.aliveTime) {
				this.div.remove();
				console.log('remove');
			}
			else {
				this.x += this.speedx;
				this.div.css({left: this.x});
			}
		}
	}

    $(window).scroll(function() {
	    if ($(window).scrollTop() >= $("#nav").scrollTop()) {
		    $('#nav').addClass("navbar-fixed");
	    }
	    if ($(window).scrollTop() < 660){
		    $('#nav').removeClass("navbar-fixed");
	    }
    });


    var canvas = document.getElementById("canvas");
    canvas.width = 300;
    canvas.height = 300;
    var context = canvas.getContext('2d');
    var colors = ['red', 'lightcoral', 'pink', 'lawngreen', 'lightblue', 'chocolate', 'cornflowerblue', 'fuchsia', 'lightseagreen'];

    // old art code, keep in case I want to use it again.
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

    // helper methods for Conway
    function Cell(x, y, dead) {
        this.color = 0;
        this.x = x;
        this.y = y;
        this.dead = dead;
    }

    function mod(x, n) {
        return (((x % n)+n)%n);
    }

    function Conway(size) {
        this.cells = [];
        this.size = size;
        this.rowsize = canvas.width / size;

        for (var i = 0; i < this.rowsize; i++) {
            var row = [];
            for (var j = 0; j < this.rowsize; j++)
                row.push(new Cell(j, i, (Math.random() * 100) < 50 == 0));
            this.cells.push(row);
        }

        this.getNeighbors = function(x, y) {
            var locations = [
                [-1, -1], [0, -1], [1, -1],
                [-1, 0],    [1, 0],
                [-1, 1], [0, 1], [1, 1]
            ];
            var results = 0;
            for (var i = 0; i < locations.length; i++) {
                var nx = mod(x + locations[i][0], this.rowsize);
                var ny = mod(y + locations[i][1], this.rowsize);
                if (!this.cells[nx][ny].dead) results++;
            }
            return results;
        };

        this.update = function() {
            var tochange = [];
            for (var i = 0; i < this.rowsize; i++) {
                for (var j = 0; j < this.rowsize; j++) {
                    var neighborCount = this.getNeighbors(j, i);
                    if (!this.cells[j][i].dead) {
                        if (neighborCount < 2 || neighborCount > 3) {
                            tochange.push([j, i]);
                        }
                    }
                    else {
                        if (neighborCount == 3)
                            tochange.push([j, i]);
                    }
                }
            }
            for (i = 0; i < tochange.length; i++) {
                var x = tochange[i][0];
                var y = tochange[i][1];
                this.cells[x][y].dead = !this.cells[x][y].dead;
                this.cells[x][y].color = (this.cells[x][y].color + 1) % colors.length;
            }
        };

        this.generate = function(amount) {
            for (i = 0; i < amount; i++)
                this.update();
        };


        this.render = function() {
			for (i = 0; i < this.rowsize; i++) {
				for (j = 0; j < this.rowsize; j++) {
					context.fillStyle = colors[this.cells[j][i].color];
                    if (!this.cells[j][i].dead) context.fillStyle = 'black';
					context.fillRect(j *this.size, i * this.size, this.size, this.size);
				}
			}
        }

    }

    //createArt(0, 0, canvas.width, canvas.height, 6);
    var c = new Conway(15);
    c.generate(50);
    c.render();

	/*
	setInterval(function() {
		if (Math.random() * 400 < 10) {
			clouds.push(new Cloud());
			console.log(clouds.length);
		}
		clouds = clouds.filter(function(cloud) {
			cloud.update();
			return cloud.time <= cloud.aliveTime;
		});
	}, 1000/60);
	*/

});

