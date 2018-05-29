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
    if ($('#password').val() == "" && $('#password-confirm').val() == "")
    {
        $('#message').html('');
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

// var elmt = document.getElementById('name');
// var lname = document.getElementById('lname');
// var password = document.getElementById('password');
// var confirm = document.getElementById('password-confirm');
// var email = document.getElementById('email');

// elmt.addEventListener('keydown', function (event) {
//     if (elmt.value.length === 0 && event.which === 32) {
//         event.preventDefault();
//     }
// });
// lname.addEventListener('keydown', function (event) {
//     if (lname.value.length === 0 && event.which === 32) {
//         event.preventDefault();
//     }
// });
// password.addEventListener('keydown', function (event) {
//     if (password.value.length === 0 && event.which === 32) {
//         event.preventDefault();
//     }
// });
// email.addEventListener('keydown', function (event) {
//     if (email.value.length === 0 && event.which === 32) {
//         event.preventDefault();
//     }
// });
// confirm.addEventListener('keydown', function (event) {
//     if (confirm.value.length === 0 && event.which === 32) {
//         event.preventDefault();
//     }
// });


 
function testSearch(){ 
$('#searchtest').keyup(function () {

    var filter = this.value.toLowerCase();

    $('.card').each(function() {
        
        var _this = $(this);
        var title = _this.find('h3').text().toLowerCase();

        if (title.indexOf(filter) < 0) {
            _this.hide();
        }else{
            _this.show();
        }
    });
});
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
            console.log(data);
            fillModal(data);
        }

    });
 })

 function fillModal(data){
     console.log(data.questionID);
     var question = data.question[0].questiontext;
     var points = data.question[0].points;
     var a = data.answers[0];
     var b = data.answers[1];
     var c = data.answers[2];
     var d = data.answers[3];
     var array = [a,b,c,d];

     $('.ok').prop('checked', false);

    if(a.correct == 1){
        console.log('a is correct');
        $('.checka').prop('checked', true);
    }
    else if(b.correct == 1){
        $('.checkb').prop('checked', true);
        console.log('b is correct');
    }
    else if(c.correct == 1){
        $('.checkc').prop('checked', true);
        console.log('c is correct');
    }
    else if(d.correct == 1){
        $('.checkd').prop('checked', true);
        console.log('d is correct');
    }

     console.log(a,b,c,d);
     $('#questioninput').val(question);
     $('#ansa').val(a.answertext);
     $('#ansb').val(b.answertext);
     $('#ansc').val(c.answertext);
     $('#ansd').val(d.answertext);
     $('.selectPoints').val(points);
     $('.hiddenQID').val(data.questionID);

 }

 $('#createCategoryBtn').click(function(){
     console.log('good');
     var category = $('#newCategoryInput').val();
    if(category.trim() == ''){
        $('.message').html('Category field is empty');
    }

    else{

        $.ajax({
            type: 'POST',
            url:'http://localhost:5000/createTest/createCategory',
            error: function(data){
                console.log(data.responseJSON);
                $('.message').html(data.responseJSON.message);
            },
            data:{categoryName:category},
            dataType: "jsonp",
            success : function(data){
                
                if(data.success == true){
                     location.reload();
                } else {
                    $('.message').html(data.message);
                }
                
            }
    
        });

    }
 });

 $('#chooseExist').click(function(){
     var testName = $('#nameOfTest').html();
     console.log(testName);

    $.ajax({
        type: 'GET',
        url:'http://localhost:5000/test/'+testName+'/tests',
        error: function(data){
            console.log('ajax failed');
        },
        dataType: "jsonp",
        success : function(data){
            populateSelect(data);
            
        }

    });
 })

function populateSelect(data){
    console.log(data);

    $('#testSelect').html("");
   
   $.each(data.tests,function(index,test){
       $('#testSelect').append('<option value=' + test.id + '>' + test.testName + '</option>')
   })
     // $('#categoriesSelect').append
}

$('#testSelect').change(function(){

    $.ajax({
        type: 'POST',
        url:'http://localhost:5000/test/questions',
        error: function(data){
            console.log('error');
        },
        data:{testID:this.value},
        dataType: "jsonp",
        success : function(data){
            
            showExistingQuestions(data);
            
        }

    });

})

function showExistingQuestions(data){
    $('#questions').html("");
    $.each(data.questions, function(index, question){
        $('#questions').append('<div>'+question.QuestionText +'<button value="'+question.ID+'" onclick="addExistQuestion(event)" class="btn btn-success">Add</button></div>');
    })
}

function addExistQuestion(e){
    var testName = $("#testSelect option:selected" ).text();
    var questionID = e.target.value;

    $.ajax({
        type: 'GET',
        url:'http://localhost:5000/test/'+testName+'/'+questionID,
        error: function(){
           console.log('ajax not working')
        },
        dataType: "jsonp",
        success : function(data){
            console.log(data);
            var currentTest = $('#nameOfTest').html();

            var corr;
            if(data.answers[0].correct == 1){
                corr = 'A';
            } else if(data.answers[1].correct == 1){
                corr = 'B';
            } else if(data.answers[2].correct == 1){
                corr = 'C';
            } else if(data.answers[3].correct == 1){
                corr = 'D';
            }

            $.ajax({
                type: 'POST',
                url:'http://localhost:5000/test/'+currentTest+'',
                error: function(){
                   console.log('ajax not working');
                },
                dataType: "html",
                data:{
                    textQuest:data.question[0].questiontext,
                    selectPoint:data.question[0].points,
                    ansa:data.answers[0].answertext,
                    ansb:data.answers[1].answertext,
                    ansc:data.answers[2].answertext,
                    ansd:data.answers[3].answertext,
                    corr:corr

                    
                },
                success : function(data){
                     location.reload();
                    
                }
        
            });
            
            
        }

    });

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
	

//   })