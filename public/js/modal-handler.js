console.log("modal-handler.js loaded");
var staticPulse;
function pasivePulse() {
    staticPulse = setInterval(function() {
        $('#open-modal').addClass('animated pulse');
        setTimeout(function() {
            $('#open-modal').removeClass('animated pulse');
        }, 1500);
    }, 3000);
}
pasivePulse();
$("#open-modal").animatedModal({
    'animatedIn': 'fadeInDown',
    'animatedOut': 'fadeOutUp',
    'color': 'transparent',
    'overflow': 'hidden'
}); 
$("#open-modal").mouseover(function() {
    clearInterval(staticPulse);
    $(this).removeClass('animated pulse');
    $(this).addClass('animated pulse infinite');
    $('#hidden-profile-click').show();
}).mouseleave(function() {
    $(this).removeClass('animated pulse infinite');
    $('#hidden-profile-click').hide();
    pasivePulse();
})  

