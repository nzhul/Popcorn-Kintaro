document.addEventListener('click', function () {
    if (aPaddle.getAttr('paddleType').name == 'ShootingPaddle') {
        var vectorY = -5;
        var leftBullet = new Kinetic.Rect({
            x: aPaddle.getX(),
            y: aPaddle.getY(),
            width: 5,
            height: 5,
            fill: 'black',
            moveBullet: function () {
                moveLeftBulletUp.start();
            }
        });

        var rightBullet = new Kinetic.Rect({
            x: aPaddle.getX() + PADDLE_WIDTH,
            y: aPaddle.getY(),
            width: 5,
            height: 5,
            fill: 'black',
            moveBullet: function () {
                moveRightBulletUp.start();
            }
        });

        giftsLayer.add(leftBullet);
        giftsLayer.add(rightBullet);

        var moveLeftBulletUp = new Kinetic.Animation(function (frame) {
            leftBullet.setY(leftBullet.getY() + vectorY);

            if (leftBullet.getY() < 0) {
                leftBullet.remove();
            }


            bulletHitBrickCollision(leftBullet);
        }, giftsLayer);

        var moveRightBulletUp = new Kinetic.Animation(function (frame) {
            rightBullet.setY(rightBullet.getY() + vectorY);

            if (rightBullet.getY() < 0) {
                rightBullet.remove();
            }

            // TODO: Collision Detection for the bullets!
            // Uncomment the code bellow and try to fix it if you can.
            // There is a problem that occure when we hit the brick.
            // After we hit the brick - our bullet is destroyed and in the next loop we try to
            // get the Intersection of the same bullet that we previusly removed.
            // That couses an error.
            bulletHitBrickCollision(rightBullet);

        }, giftsLayer);


        function bulletHitBrickCollision(bullet) {
            var currentStage = bullet.getStage()
            if (currentStage) {
                var collisionObject = currentStage.getIntersection({ x: bullet.getX(), y: bullet.getY() });

                if (collisionObject) {
                    if (collisionObject.getAttr('gameObjectType') == 'brick') {
                        bullet.remove();
                        levelBrickCount -= 1;
                        playerScore += 10;
                        updateScore();
                        if (collisionObject.getAttr('isObjectProducer')) {
                            var newGift = spawnGift(collisionObject.getAttr('x'), collisionObject.getAttr('y'), collisionObject.getAttr('fill'), collisionObject.getAttr('producedObjectType'));
                            var moveGiftDown = newGift.attrs.move;
                            moveGiftDown();
                        }
                        collisionObject.remove();
                    }
                }
            }
        }


        var move1 = leftBullet.attrs.moveBullet;
        move1();
        var move2 = rightBullet.attrs.moveBullet;
        move2();
    }
});