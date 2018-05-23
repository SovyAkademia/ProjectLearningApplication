// import { workers } from "cluster";

$(document).ready(function() {
    
    $(":text").keyup(function(e) {
        if($(this).val() != '') {
            $(this).next(".test").show();
        } else {
            $(":text").removeAttr('disabled');
            $(this).next(".test").hide();
        }
    });
});

$('#password, #password-confirm').on('keyup', function () {
    if ($('#password').val() == $('#password-confirm').val()) {
      $('#message').html('Matching').css('color', 'green');
    } else 
    {
      $('#message').html('Not Matching').css('color', 'red');
    }
  });

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


// function insertName(){
// 	var namevalue = document.getElementById("testnamelabel").value;
// 	var test = document.getElementsByClassName("createdquestions");
// 	var name = document.getElementById('testname').value;
// 	var category = document.getElementById('choosecat').value;
//   	test.appendChild(document.createTextNode(name+" "+category));
// }

// function testName() {
// 	var namevalue = document.getElementById("testnamelabel").value;
// 	var ul = document.getElementById("testnamelabel");
// 	var name = document.getElementById('testname').value;
// 	var category = document.getElementById('choosecat').value;
//   	ul.appendChild(document.createTextNode(name+" "+category));
 
// }

function Search() {
    
    var input, filter, tr, td, a, i;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    tr = document.getElementById("mainTR");
    td = tr.getElementsByTagName('td');

    for (i = 0; i < td.length; i++) {
        a = document.getElementById("studname");
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            td[i].style.display = "";
        } else {
            td[i].style.display = "none";
        }
    }
}

function StudentSearch() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("studenttable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }

function newItem() {
	var item = document.getElementById('questioninput').value;
	var a = document.createElement('a');
	var questpoints = document.getElementById('pointsin').value;
	var table = document.getElementById("questionlist");
	var tr = document.createElement('tr');
	var correct = document.getElementById('pointsin').value;
  table.appendChild(tr);
  tr.appendChild(a);
  a.appendChild(document.createTextNode(item+" "+questpoints));
  document.getElementById('questioninput').value="";
  tr.onclick = removeItem;
}

    
 function addText()
{    
	 document.querySelector('.questioncontainer').innerHTML = document.querySelector('.questioninput').value+document.querySelector('.questioninput').value;
 }

 $('.editBtn').click(function(){
     var questionID = this.value;
     var testName = $('#nameOfTest').html();
     console.log(questionID);

     $.ajax({
        type: 'GET',
        url:'http://localhost:5000/test/'+testName+'/'+questionID,
        error: function(){
           console.log('ajax not working')
        },
        dataType: "jsonp",
        success : function(data){
            fillModal(data);
        }

    });
 })

 function fillModal(data){
     var question = data.question[0].questiontext;
     var points = data.question[0].points;
     var a = data.answers[0];
     var b = data.answers[1];
     var c = data.answers[2];
     var d = data.answers[3];
     var array = [a,b,c,d];

    if(a.correct == 1){
        $('#checka').attr('checked', true);
    }
    if(b.correct == 1){
        $('#checkb').attr('checked', true);
    }
    if(c.correct == 1){
        $('#checkc').attr('checked', true);
    }
    if(d.correct == 1){
        $('#checkd').attr('checked', true);
    }
     console.log(a,b,c,d);
     $('#questioninput').val(question);
     $('#ansa').val(a.answertext);
     $('#ansb').val(b.answertext);
     $('#ansc').val(c.answertext);
     $('#ansd').val(d.answertext);
     $('.selectPoints').val(points);

 }


//  $('.class-select').change(function(){
// 	 console.log('lol');
//  })


// $('.class-select').change(function(){
// 	$.ajax({
// 		type: 'GET',
// 		url:'http://localhost:5000/students/class/'+this.value+'',
		
// 		error: function(){
// 		   console.log('ajax not working')
// 		},
// 		dataType: "jsonp",
// 		success: function (data) {
// 			console.log(data)
// 			// location.reload();
// 		},
	
// 	});

// });

/* function form_submit(){
	document.getElementById("form").submit();
} */

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