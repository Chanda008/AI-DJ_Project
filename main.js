song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("Over_the_Horizon.mp3");
}

function setup(){
    canvas= createCanvas(400, 300);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PostNet is initialised");
}

function draw(){
    image(video, 0, 0, 400, 300);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("#fc0303");
    stroke("#fc0303");

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing Song 1";
        }
        
    }
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing Song 2";
        }
        
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score right wrist = " + scoreRightWrist + "score left wrist" + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist X = " + rightWristX + "right wrist y = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist X = " + leftWristX + "left wrist y = " + leftWristY);
    }
    }

