// create the controller and inject Angular's $scope
app.controller('taskController', function($scope,$http,$routeParams) {  
 $(function() {
    $scope.taskId = $routeParams.id;
    $scope.task = {};
    $http.get('./data/dummyData.json').then(function(response){
        console.log(response.data.projects);
        var projects  = response.data.projects; 
        console.log(projects);        
        for(var i=0; i< projects.length; i++){
            console.log(projects[i].tasks);
            for(var j = 0; j< projects[i].tasks.length; i++){                
                if(projects[i].tasks[j].id == $scope.taskId){
                  $scope.task = projects[i].tasks[j]                  
                  clockwork(projects[i].tasks[j]);
                  break;
                }
            }
        }
    });
});

    function clockwork(task){
        
        var progressbar = $("#progressbar"),
            progressLabel = $(".progress-label"),         
            currentTime = $scope.task.current.split(':').reduce((acc, time) => (60 * acc) + +time),
            maxTime = $scope.task.estimate.split(':').reduce((acc, time) => (60 * acc) + +time);
        progressbar.progressbar({
            max: maxTime,
            value: currentTime,
            change: function() {
                progressLabel.text((progressbar.progressbar("value") * 100 / maxTime).toFixed(3) + "%");
            },
            complete: function() {
                progressLabel.text("Overtime!");
                progressbar.addClass("overtime");
            }
        });

        var timer = new Timer();
        timer.stop();
        timer.addEventListener('secondsUpdated', function(e) {

        var val = progressbar.progressbar("value") || 0;
        progressbar.progressbar("value", val + 1);

        });
        $('.timer-start').click(function() {
            var time = $('.counter-time h2').text().split(':').reduce((acc, time) => (60 * acc) + +time)
            timer.start({
                precision: 'seconds',
                startValues: {
                    seconds: time
                }
            });
        });
        $('.timer-pause').click(function() {
            timer.pause();
        });
        $('.timer-stop').click(function() {
            timer.stop();
            progressbar.progressbar("value", 0);
            $('.counter-time h2').text("00:00:00");
        });
        $('.timer-reset').click(function() {
            timer.reset();
            progressbar.progressbar("value", 0);
            $('.counter-time h2').text("00:00:00");
        });
        timer.addEventListener('secondsUpdated', function(e) {
            $('.counter-time h2').html(timer.getTimeValues().toString());
        });
        timer.addEventListener('started', function(e) {
            $('.counter-time h2').html(timer.getTimeValues().toString());
        });
        timer.addEventListener('reset', function(e) {
            $('.counter-time h2').html(timer.getTimeValues().toString());
        });
    }

 



});