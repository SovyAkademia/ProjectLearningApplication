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

$("namediv").empty();

function testName() {
	var namevalue = document.getElementById("testnamelabel").value;
	var ul = document.getElementById("testnamelabel");
	var name = document.getElementById('testname').value;
	var category = document.getElementById('choosecat').value;
  	ul.appendChild(document.createTextNode(name+" "+category));
 
}

function newItem() {
	var item = document.getElementById('questioninput').value;
	var a = document.createElement('a');
	var questpoints = document.getElementById('pointsin').value;
	var tr = document.getElementById("questionlist");
	var td = document.createElement('tr');
	var correct = document.getElementById('pointsin').value;
  td.appendChild(document.createTextNode(item+" "+questpoints));
  tr.appendChild(td);
  td.appendChild(a);
  document.getElementById('questioninput').value="";
  td.onclick = removeItem;
}


    
// function addText()
// {
//     document.querySelector('.questioncontainer').innerHTML = document.querySelector('.questioninput').value+document.querySelector('.questioninput').value;
// }

// function addRow() {
//     var div = document.createElement('div');

//     div.className = 'row';

//     div.innerHTML = '<div id="counter"></div><input class="col-md-8 col-sm-10 questioninput" placeholder="Question?" type="text" value="" />\
// 		<input class="btn btn-danger btn-delete" type="button" value="Delete" onclick="removeRow(this)"><br>\
// 		<div class="row">\
// 		<div class="container">\
// 		<div class="col-md-12 col-sm-12">\
//          				<input id="pointsin" placeholder="Points" list="points">\
// 						<datalist id="points">\
// 						<option value="1">\
// 						<option value="2">\
// 						<option value="3">\
// 						<option value="4">\
// 						<option value="5">\
// 						</datalist><br>\
// 					<label for="">A</label><input class="answer" type="text"><input class="ok" name="correctans" type="radio"><br>\
//                     <label for="">B</label><input class="answer" type="text"><input class="ok" name="correctans" type="radio"><br>\
//                     <label for="">C</label><input class="answer" type="text"><input class="ok" name="correctans" type="radio"><br>\
//                     <label for="">D</label><input class="answer" type="text"><input class="ok" name="correctans" type="radio">\
// 					</div>\
// 					</div>\
// 					</div><hr>';
   
// 					document.getElementById('content').appendChild(div);
// }

// function removeRow(input) {
//     document.getElementById('content').removeChild( input.parentNode );
// }



// $('#create').click(function() {
// 	$('#counter').html(+$('#counter').html()+1);
// 	var counterval = $('#counter').html;
	

//   });