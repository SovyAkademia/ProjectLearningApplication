// import { workers } from "cluster";

$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('.studentAcceptBtn').click(function(){
		var email = $(this).parent().parent().find('.regEmail').html();
		var divToRemove = $(this).parent().parent();
		var fade = { opacity: 0, transition: 'opacity 0.5s' };
		
		console.log(email);
		$.ajax({
			type: 'POST',
			url:'http://localhost:5000/dashboard/handleRegistration',
			data: {'email':email},
            
            error: function(){
               console.log('ajax not working')
            },
            dataType: "jsonp",
            success : function(data){
				console.log(divToRemove.css(fade).slideUp(500,function(){divToRemove.remove()}));
			},

        });
	});

	

});


function addRow() {
    var div = document.createElement('div');

    div.className = 'row';

    div.innerHTML = '<div id="counter"></div><input class="col-md-8 col-sm-10 questioninput" type="text" value="" />\
        <input class="btn btn-danger btn-delete" type="button" value="Delete" onclick="removeRow(this)">';

     document.getElementById('content').appendChild(div);
}

function removeRow(input) {
    document.getElementById('content').removeChild( input.parentNode );
}



$('#create').click(function() {
	$('#counter').html(+$('#counter').html()+1);
	var counterval = $('#counter').html;
	
	
  });