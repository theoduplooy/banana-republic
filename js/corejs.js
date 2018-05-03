/// BANANA TEST PROJECT: CORE JS ///
/// by Theo du Plooy ///

$(document).ready(function(){
	initialInit();
});

function initialInit() {
	/// Does initial bindings ///
	displayContent();
	slidePanelControl();
	handleResize();
	setFormvalues('defaultvalues');
	circleSelector();
	Bindings();
}

/// Gloabal Vars ///
var globaltransitionspeedjs = "350"; 

/// Add content from javascript variable to fetchContent object ///
var fetchContent = {
	panelLeftContent : panelLeftContent,
	panelRightContent : panelRightContent,
	panelSlideContent : panelSlideContent
}


function handleResize() {
	//// Handles reset of slide panel on resize event - for responsive scenarios ///
	var openCloseIndicator = "closed";
	var checkResponsiveIndicator = $(".responsiveIndicator").css("font-size");
		
	$(window).bind("resize",function(){
		$(".panel-overlay-slide").removeAttr("style");
		$(".slide-panel-control").attr("openclosed","closed");
	});
}


/// FORM VALUES ///
var defaultformValues = {
  	name: 'Kendall Jenner',
	dateofbirth: '01/02/1983',
	email: 'kendall#email.com',
	telnumbermobile: '+91 98765 43210',
	customerid: '576802-ERD0348 45'
}

var clearformValues = {
	name: '',
	dateofbirth: '',
	email: '',
	telnumbermobile: '',
	customerid: ''
}

/// *** *** ///

function setFormvalues(getvalue) {
	/// Sets the default / cleear form values ///
	switch(getvalue) {
		case 'defaultvalues':
			$(".form-name").val(defaultformValues.name);
			$(".form-dateofbirth").val(defaultformValues.dateofbirth);
			$(".form-telnumbermobile").val(defaultformValues.telnumbermobile);
			$(".form-customerid").val(defaultformValues.customerid);
			$(".form-email").val(defaultformValues.email);
		break;
		case 'clear' :
			$(".demoformrow").removeClass("form-inline-error");
			$(".form-name").val(clearformValues.name);
			$(".form-dateofbirth").val(clearformValues.dateofbirth);
			$(".form-telnumbermobile").val(clearformValues.telnumbermobile);
			$(".form-customerid").val(clearformValues.customerid);
			$(".form-email").val(clearformValues.email);
			$(".circle-selector").removeClass("selected");
		break;
		default:
		break;

	}
}

function displayContent() {
	/// Reads panel contents from fetchContent object and displays accordingly. Contains error handling in case content file not loaded. ///
	try{
		$(".panel-left-content").html(fetchContent.panelLeftContent);
		$(".panel-right-content").html(fetchContent.panelRightContent);
		$(".panel-overlay-slide-content").html(fetchContent.panelSlideContent);
	
	}
	catch(e){
		// console.log("Error Reading Content: "+e);
		userFeedback("There was an error displaying the content. Please check your connection and try again.");
	}
}


function slidePanelControlAnimation(getresponsivestate,getopenclosedindicator) {
	/// Controls the slide panel animation + handles in the panel in responsive scenarios ///
	var slidecontrolset = ""+getresponsivestate+"-"+getopenclosedindicator+"";

	switch(slidecontrolset) {
		case 'mobile-open':
			$(".panel-overlay-slide").animate({
				top: '0px'
			},globaltransitionspeedjs,function(){
				$('html, body').animate({
				scrollTop: ($('.panel-overlay-slide').offset().top)
				},globaltransitionspeedjs);
			});
			
		break;
		case 'mobile-closed':
			$(".panel-overlay-slide").animate({
				top: "-4000px"
			},globaltransitionspeedjs,function(){
				
				$(".slide-panel-control").attr("openclosed","closed");
			});

		break;
		case 'tablet-open':
			$(".panel-overlay-slide").animate({
				left: '0px'
			},globaltransitionspeedjs);
		break;
		case 'tablet-closed':
			$(".panel-overlay-slide").animate({
				left: '-2000px'
			},globaltransitionspeedjs,function(){
				$(".slide-panel-control").attr("openclosed","closed");
			});
		break;
		case 'desktop-open':
			$(".panel-overlay-slide").animate({
				left: '0px'
			},globaltransitionspeedjs);
		break;
		case 'desktop-closed':

			$(".panel-overlay-slide").animate({
				left: '-2000px'
			},globaltransitionspeedjs,function(){
				$(".slide-panel-control").attr("openclosed","closed");
			});
		break;
		default:
		break;
	}
}



function slidePanelControl() {
	/// The actual slide panel control bindings with open / closed state handlers ///
	var openCloseIndicator = "closed";
	/// Controls slide panel ///
	$(".slide-panel-control").on('click',function(){
		var getopenclosedindicator = $(this).attr("openclosed");
		if (getopenclosedindicator == "closed") {
			$(this).attr("openclosed","open");
			var getnewindicator = $(this).attr("openclosed");
			openCloseIndicator = getnewindicator;
		}
		if (getopenclosedindicator == "open") {
			$(this).attr("openclosed","closed");

			var getnewindicator = $(this).attr("openclosed");
			openCloseIndicator = getnewindicator;

		}

		var checkResponsiveIndicator = $(".responsiveIndicator").css("font-size");
		if (checkResponsiveIndicator == "0px") {
			slidePanelControlAnimation('mobile',openCloseIndicator);
		}
		if (checkResponsiveIndicator == "1px") {
			slidePanelControlAnimation('desktop',openCloseIndicator);
		}
		else {
			/// do nothing ///
		}

		
	});
	}

function circleSelector() {
	/// Handles the "circle controls" icon menu elements in the form ///
	$(".circle-selector-group").each(function(){
		$(this).find(".circle-selector").on("click",function(){
			$(this).parent(".circle-selector-group").find(".circle-selector").removeClass("selected");
			$(this).addClass("selected");
		});
	})
}

function Bindings(){
	/// Handles the bindings on all buttons / links + panel lady animation binding //
	$(".button-cancel").on("click",function(){
		userFeedback("Default form values cleared. Refresh page to see default values again.");
		setFormvalues("clear");
	});

	$(".button-save").on("click",function(){
		userFeedback("Save / Submit functionality not included - not part of the scope of this exercise.");
	});

	$(".form-dateofbirth").on("click",function(){
		userFeedback("Calendar functionality not included - not part of the scope of this exercise.");
	});

	$(".functionality-notavailable").on("click",function(){
		userFeedback("Functionality not included - not part of the scope of this exercise.");
	});

	$(".panel-lady-image").on("mouseover",function(){
		var originalthiswidth = $(this).width();
		var modifythiswidth = parseInt($(this).width()+5);
		$(this).animate({
			width: modifythiswidth
		},globaltransitionspeedjs,function(){
			$(this).animate({
				width: originalthiswidth
			},globaltransitionspeedjs);
		});
	})
}

function userFeedback(messagetouser){
	/// UI User feedback element control - to display messages to the user ///
	$(".user-feedback").remove();
	var userFeedbackmessage = messagetouser;
	var userfeedbackdiv = '<div class="user-feedback">'+messagetouser+'</div>';
	$("body").append(userfeedbackdiv);
	setTimeout(function(){
		// function here
		$(".user-feedback").fadeOut(globaltransitionspeedjs);
	},4500,function(){
		$(".user-feedback").remove();
	});
}