var count = 0;
var splitCount = 0;
var totalBalls = 30;
var ballsLeft = totalBalls;
var levelCount = 1;
var highScore;

var needPoints = levelCount * totalBalls * 3;

$('#scoreCounter').html(splitCount);
$('#levelCounter').html(levelCount);
$('#ballCounter').html(ballsLeft);
$('#needPoints').html(needPoints);

function moveBalls() {
    var size, top, left, radius, shadowWidth;

    if (count % 20 == 0) {
        size = Math.floor(Math.random() * 80) + 5;
        left = Math.floor(Math.random() * 601) + 200;
        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        radius = size / 2;
        shadowWidth = size / 3;
        shadowBlur = size / 7;
        $('.game').append('<div class="bubble" style="height:' + size + 'px; width:' + size + 'px; background:' + color + ' ; border-radius:' + radius + 'px; top: 0px; left: ' + left + 'px; "></div> ')
        ballsLeft--;
        $('#ballCounter').html(ballsLeft);
    }

    $('.bubble').each(function () {
        var position = $(this).position(); // get top position
        if (position.top > 500) { 
            $(this).remove();
        } else { // if not then increase the position css by 1 px; 
            $(this).css('top', position.top + levelCount);
        }
    });

    count++;
}

function begin() {
    ballsLeft = totalBalls;

    var Run = setInterval(function () {

        moveBalls();

        if (ballsLeft === 0) {

            window.clearInterval(Run);
            $('.bubble').each(function () {
                $(this).remove();
                var notifyText;
                $('#notify').show();
                if (splitCount < levelCount * totalBalls * 3) {
                    notifyText = 'Score: ' + highScore + '. Sorry you did not get enough points. Back to the beginning and <button class="begin">Try Again</button>';
                    splitCount = 0;
                    $('#scoreCounter').html(splitCount);
                    levelCount = 1;
                    $('#levelCounter').html(levelCount);
                } else {
                    notifyText = 'Score: ' + splitCount + '. Good job. On to the next level. <button class="next">Go! </button> ';
                }
                $('#notify').html(notifyText);

            });
        }
    }, 40);
}


$(function () {
    $('.begin').live('click', function () {
        $(this).parent().hide();
        begin();
    });

    $('.next').live('click', function () {
        $(this).parent().hide();
        levelCount++;
        $('#levelCounter').html(levelCount);
        needPoints = levelCount * totalBalls * 3;
        $('#needPoints').html(needPoints);
        begin();
    });

    $('.bubble').live('click', function () {
        var position = $(this).position(); // get top position
        var width = $(this).width();
        var color = $(this).css('background-color');
        var size, top, left, radius;
        $(this).remove();

        for (i = 0; i < 4; i++) {
            size = Math.floor(Math.random() * width);
            if (i % 2 == 0) {
                top = position.top - Math.floor(Math.random() * (width + 20));
                var left = position.left - Math.floor(Math.random() * (width + 20));
            } else {
                top = position.top + Math.floor(Math.random() * (width + 20));
                var left = position.left + Math.floor(Math.random() * (width + 20));

            }
            radius = Math.floor(size / 2);
            $('.game').append('<div class="bubble split" style="height:' + size + 'px; width:' + size + 'px; background:' + color + ' ; border-radius:' + radius + 'px; top: ' + top + 'px; left: ' + left + 'px; "></div> ')
            splitCount++;
            highScore = splitCount;
            $('#scoreCounter').html(splitCount);
        }

    })
});
