////////////////////////////////////////
// script.js program
// FSJS Project 3 - Build an Interactive Form
// Tom Flynn
// 05/15/2018
////////////////////////////////////////

////////////////////////////////////////
// Functions Section
////////////////////////////////////////

// Select Theme function
function selectTheme(){
  $(".themeErr").show();
  $("#color").hide();
  $("label[for='color']").hide();
};
// End Select Theme function

// Select JS Puns function
function selectJspuns(){
  $("#color option:contains('Puns')").css('display', '');
  $("#color option:contains('JS shirt only')").css('display', 'none');
  $("#color option:eq(0)").prop('selected', 'true');
};
// End Select Puns function

// Select Heart JS function
function selectHeartjs(heartsFirst){
  $("#color option:contains('Puns')").css('display', 'none');
  $("#color option:contains('JS shirt only')").css('display', '');
  $("#color option:eq(3)").prop('selected', 'true');
};
// End Select Love JS function

////////////////////////////////////////
// End Functions Section
////////////////////////////////////////


////////////////////////////////////////
// One-Time Processing Section
////////////////////////////////////////

// create user name error messages & set border
$("#name").before("<div class='nameErr'>Name cannot be blank");
$("#name").css('border-color', 'red');

// create email error messages & set border
$("#mail").before("<div class='emailErr1'>Email cannot be blank");
$("#mail").before("<div class='emailErr2'>Email must be in name@domain.xxx format");
$("#mail").css('border-color', 'red');

// email test Pattern
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

// add title "other" field & error messages
$("#otherDesc").before("<div class='otherErr1'>Other description cannot be blank");
$("#otherDesc").before("<div class='otherErr2'>Other description cannot be 'Your Job Role'");
$("#otherDesc").val('Your Job Role');
$("#otherDesc").css('border-color', 'red');
$("#otherDesc").hide();
$("label[for='otherDesc']").hide();
$(".otherErr1").hide();
$(".otherErr2").hide();

// design theme error
$("#color").before("<div class='themeErr'>Theme must be selected");

// hide shirt color section
$("#color").hide();
$("label[for='color']").hide();

// create activities error message
$(".activities label:first").before("<div class='actvErr'>Main Conference must be selected");

// define conference total & make it read-only
let confTotalAmt = 0;
$(".activities").after("<input type='text' id='confTotal' name='conf_total'>");
$("#confTotal").before("<br><label for='conf_total'>Total $ </label>");
$("#confTotal").val(confTotalAmt).css('width', '25%');
$("#confTotal").prop('readonly', true);

// create payment error message
$("#payment").before("<div class='paymentErr'>Payment method must be selected");
$(".paymentErr").hide();

// set default payment option to credit card
$("#payment option:eq(1)").prop('selected', 'true');

// hide Paypal and Bitcoin text
$("p:contains('PayPal')").css('display', 'none');
$("p:contains('Bitcoin')").css('display', 'none');

// create cc, zip and cvv errors
$("#cc-num").before("<div class='ccErr'>CC# must be 15 or 16 digits");
$("#cc-num").css('border-color', 'red');
$("#zip").before("<div class='zipErr'>Zip: 5 digits");
$("#zip").css('border-color', 'red');
$("#cvv").before("<div class='cvvErr'>CVV#: 3 digits");
$("#cvv").css('border-color', 'red');

// test patterns for cc, zip and cvv
const ccPattern = /^\d{15,16}$/;
const zipPattern = /^\d{5}$/;
const cvvPattern = /^\d{3}$/;

// create submit message
$("button").before("<div class='submitMsg'>All fields must be completed before form can be submitted");

// change register button type from
// submit to button (to better control submit
// in the button click Handler
$("button").prop("type", "button");

// create forms success message
$(".submitMsg").after("<div class='formSuccess'><br>CONGRATULATIONS! Form Submitted!");
$(".formSuccess").hide();

// create forms error message
$(".submitMsg").after("<div class='formErr'><br>Form not submitted - errors still present");
$(".formErr").hide();

// set focus to the first form field
$("#name").focus();

////////////////////////////////////////
// End One-Time Processing Section
////////////////////////////////////////

////////////////////////////////////////
// Start Event Handlers Section
////////////////////////////////////////

// Enter key event handler
//   ** test for enter key press
//      and prevent default page refresh
$("body").keypress(function(event){
  if (event.which == 13){
    event.preventDefault();
  };
});
// end enter key click handler

// User name event handler
//   ** test for non-blank characters with keyup handler
//      and hide error message
$("#name").keyup(function(event){
  let keyPresd = event.which;
  let nameTest = $("#name").val();
  if ((nameTest == null) || (nameTest == "")) {
    $(".nameErr").show();
    $("#name").css('border-color', 'red');
  };
  if (nameTest != "") {
    $(".nameErr").hide();
    $("#name").css('border-color', '');
  };
});
// end user name event handler

// Email event handler
//   ** test for non-blank characters and proper format
//      with keyup event handler
$("#mail").keyup(function(event){
  event.preventDefault();
  let emailTest = $("#mail").val();
  // test for blank field
  if ((emailTest == null) || (emailTest == "")) {
    $(".emailErr1").show();
    $(".emailErr2").show();
    $("#mail").css('border-color', 'red');
  };
  if (emailTest != "") {
    $(".emailErr1").hide();
  };
  // test for correct email format
  if (emailTest.match(emailPattern)) {
    $(".emailErr2").hide();
    $("#mail").css('border-color', '');
  } else {
    $(".emailErr2").show();
    $("#mail").css('border-color', 'red');
  };
});
// end email event handler

// title name event click handler
//   ** if 'other' selected, show 'other description' section
$("#title").click(function(event){
  //let keyPresd = event.which;
  //console.log(keyPresd);
  let titleTest = $("#title").val();
  if (titleTest == 'other'){
    $("#otherDesc").show();
    $("label[for='other_description']").show();
  } else {
    $("#otherDesc").hide();
    $("label[for='other_description']").hide();
    $(".otherErr1").hide();
    $(".otherErr2").hide();
  };
});
// end title event handler

// Other description event handler
//   ** test for non-blank characters with keyup handler
//      and hide error message
$("#otherDesc").keyup(function(event){
  let keyPresd = event.which;
  let otherTest = $("#otherDesc").val();
  let otherTestLower = otherTest.toLowerCase();
  if ((otherTest == null) || (otherTest == "")) {
    $(".otherErr1").show();
    $(".otherErr2").show();
    $("#otherDesc").css('border-color', 'red');
  };
  if (otherTest != "") {
    $(".otherErr1").hide();
    $(".otherErr2").hide();
    $("#otherDesc").css('border-color', '');
  };
  if (otherTestLower == 'your job role') {
    //$(".otherErr1").show();
    $(".otherErr2").show();
    $("#otherDesc").css('border-color', 'red');
  };
});
// end other description event handler

// shirt design event click handler
$("#design").click(function(event){ //s1
  let designTest = $("#design").val();
  if (designTest == 'Select Theme'){ //s2
    selectTheme();
  }; //e2
  if (designTest != 'Select Theme'){ //s2
    $(".themeErr").hide();
    $("label[for='color']").show();
    $("#color option:contains('Puns')").css('display', 'none');
    $("#color option:contains('JS shirt only')").css('display', 'none');
    // call functions to display shirt colors
    if (designTest == 'js puns'){ //s3
      selectJspuns();
    }; //e3
    if (designTest == 'heart js'){ //s3
      selectHeartjs();
    }; //e3
    $("#color").show();
    $("label[for='color']").show();
  }; //e2
}); //e1
// end design event handler

// activities - main conference
//   event click handler
$(".activities [name='all']").click(function(event){ //s1
  let actvTest = $(".activities");
  let isChecked = event.target.checked;
  if (isChecked){
    $(".actvErr").hide();
    confTotalAmt = (confTotalAmt + 200);
    $("#confTotal").val(confTotalAmt);
  } else {
    $(".actvErr").show();
    confTotalAmt = (confTotalAmt - 200);
    $("#confTotal").val(confTotalAmt);
  }
});
// end activities - main conf click handler

// activities - js frameworks
//   event click handler
$(".activities [name='js-frameworks']").click(function(event){ //s1
  let actvTest = $(".activities");
  let isChecked = event.target.checked;
  if (isChecked){
    confTotalAmt = (confTotalAmt + 100);
    $("#confTotal").val(confTotalAmt);
    // block express activity checkbox
    $(".activities [name='express']").attr('disabled', true);
  } else {
    confTotalAmt = (confTotalAmt - 100);
    $("#confTotal").val(confTotalAmt);
    // display express activity checkbox
    $(".activities [name='express']").attr('disabled', false);
  };
});
// end activities - js frameworks click handler

// activities - js libraries
//   event click handler
$(".activities [name='js-libs']").click(function(event){ //s1
  let actvTest = $(".activities");
  let isChecked = event.target.checked;
  if (isChecked){
    confTotalAmt = (confTotalAmt + 100);
    $("#confTotal").val(confTotalAmt);
    // block node activity checkbox
    $(".activities [name='node']").attr('disabled', true);
  } else {
    confTotalAmt = (confTotalAmt - 100);
    $("#confTotal").val(confTotalAmt);
    // display node activity checkbox
    $(".activities [name='node']").attr('disabled', false);
  };
});
// end activities - js libs click handler

// activities - express
//   event click handler
$(".activities [name='express']").click(function(event){ //s1
  let actvTest = $(".activities");
  let isChecked = event.target.checked;
  if (isChecked){
    confTotalAmt = (confTotalAmt + 100);
    $("#confTotal").val(confTotalAmt);
    // block js frameworks activity checkbox
    $(".activities [name='js-frameworks']").attr('disabled', true);
  } else {
    confTotalAmt = (confTotalAmt - 100);
    $("#confTotal").val(confTotalAmt);
    // display jsframeworks activity checkbox
    $(".activities [name='js-frameworks']").attr('disabled', false);
  };
});
// end activities - express click handler

// activities - node
//   event click handler
$(".activities [name='node']").click(function(event){ //s1
  let actvTest = $(".activities");
  let isChecked = event.target.checked;
  if (isChecked){
    confTotalAmt = (confTotalAmt + 100);
    $("#confTotal").val(confTotalAmt);
    // block js libs activity checkbox
    $(".activities [name='js-libs']").attr('disabled', true);
  } else {
    confTotalAmt = (confTotalAmt - 100);
    $("#confTotal").val(confTotalAmt);
    // display js libs activity checkbox
    $(".activities [name='js-libs']").attr('disabled', false);
  };
});
// end activities - node click handler

// activities - build tools
//   event click handler
$(".activities [name='build-tools']").click(function(event){ //s1
  let actvTest = $(".activities");
  let isChecked = event.target.checked;
  if (isChecked){
    confTotalAmt = (confTotalAmt + 100);
    $("#confTotal").val(confTotalAmt);
  } else {
    confTotalAmt = (confTotalAmt - 100);
    $("#confTotal").val(confTotalAmt);
  };
});
// end activities - build tools click handler

// activities - npm
//   event click handler
$(".activities [name='npm']").click(function(event){ //s1
  let actvTest = $(".activities");
  let isChecked = event.target.checked;
  if (isChecked){
    confTotalAmt = (confTotalAmt + 100);
    $("#confTotal").val(confTotalAmt);
  } else {
    confTotalAmt = (confTotalAmt - 100);
    $("#confTotal").val(confTotalAmt);
  };
});
// end activities - npm click handler

// payment event click handler
$("#payment").click(function(event){ //s1
  let paymentTest = $("#payment").val();
  if (paymentTest == 'select_method'){ //s2
    $(".paymentErr").show();
    $("p:contains('PayPal')").css('display', 'none');
    $("p:contains('Bitcoin')").css('display', 'none');
    $("#credit-card").css('display', '');
  }; //e2
  if (paymentTest != 'select_method'){ //s2
    $(".paymentErr").hide();
    $("p:contains('PayPal')").css('display', 'none');
    $("p:contains('Bitcoin')").css('display', 'none');
    $("#credit-card").css('display', '');
    if (paymentTest == 'credit card'){ //s3
      $("p:contains('PayPal')").css('display', 'none');
      $("p:contains('Bitcoin')").css('display', 'none');
      $("#credit-card").css('display', '');
    }; //e3
    if (paymentTest == 'paypal'){ //s3
      $("p:contains('PayPal')").css('display', '');
      $("p:contains('Bitcoin')").css('display', 'none');
      $("#credit-card").css('display', 'none');
    }; //e3
    if (paymentTest == 'bitcoin'){ //s3
      $("p:contains('PayPal')").css('display', 'none');
      $("p:contains('Bitcoin')").css('display', '');
      $("#credit-card").css('display', 'none');
    }; //e3
  }; //e2
}); //e1
// end design event handler

// Credit card event handler
//   ** test for non-blank characters and proper format
//      with keyup event handler
$("#cc-num").keyup(function(event){
  event.preventDefault();
  let ccTest = $("#cc-num").val();
  // test for blank field
  if ((ccTest == null) || (ccTest == "")) {
    $(".ccErr").show();
    $("#cc-num").css('border-color', 'red');
  };
  if (ccTest != "") {
    $(".ccErr").hide();
    $("#cc-num").css('border-color', '');
  };
  // test for correct cc# format
  if (ccTest.match(ccPattern)) {
    $(".ccErr").hide();
    $("#cc-num").css('border-color', '');
  } else {
    $(".ccErr").show();
    $("#cc-num").css('border-color', 'red');
  };
});
// end credit card event handler

// Zip Code event handler
//   ** test for non-blank characters and proper format
//      with keyup event handler
$("#zip").keyup(function(event){
  event.preventDefault();
  let zipTest = $("#zip").val();
  // test for blank field
  if ((zipTest == null) || (zipTest == "")) {
    $(".zipErr").show();
    $("#zip").css('border-color', 'red');
  };
  if (zipTest != "") {
    $(".zipErr").hide();
    $("#zip").css('border-color', '');
  };
  // test for correct zip code format
  if (zipTest.match(zipPattern)) {
    $(".zipErr").hide();
    $("#zip-num").css('border-color', '');
  } else {
    $(".zipErr").show();
    $("#zip-num").css('border-color', 'red');
  };
});
// end zip code card event handler

// CVV Code event handler
//   ** test for non-blank characters and proper format
//      with keyup event handler
$("#cvv").keyup(function(event){
  event.preventDefault();
  let cvvTest = $("#cvv").val();
  // test for blank field
  if ((cvvTest == null) || (cvvTest == "")) {
    $(".cvvErr").show();
    $("#cvv").css('border-color', 'red');
  };
  if (cvvTest != "") {
    $(".cvvErr").hide();
    $("#cvv").css('border-color', '');
  };
  // test for correct zip code format
  if (cvvTest.match(cvvPattern)) {
    $(".cvvErr").hide();
    $("#cvv-num").css('border-color', '');
  } else {
    $(".cvvErr").show();
    $("#cvv-num").css('border-color', 'red');
  };
});
// end cvv code event handler

// form register submit button event click handler
// prevent form submittal if error messages present
$("button").click(function(event){
  let errPresent = 'no';
  // test for presence of error messages
  if ($(".nameErr").is(":visible") == true) {
     errPresent = "yes";
  };
  if ($(".emailErr1").is(":visible") == true){
      errPresent = "yes";
  };
  if ($(".emailErr2").is(":visible") == true){
    errPresent = "yes";
  };
  if ($(".otherErr1").is(":visible") == true){
    errPresent = "yes";
  };
  if ($(".otherErr2").is(":visible") == true){
    errPresent = "yes";
  };
  if ($(".themeErr").is(":visible") == true){
    errPresent = "yes";
  };
  if ($(".actvErr").is(":visible") == true){
    errPresent = "yes";
  };
  if ($(".ccErr").is(":visible") == true){
    errPresent = "yes";
  };
  if ($(".zipErr").is(":visible") == true){
    errPresent = "yes";
  };
  if ($(".cvvErr").is(":visible") == true){
    errPresent = "yes";
  };
  if ($(".paymentErr").is(":visible") == true){
    errPresent = "yes";
  };

  // if errors present, block form submit
  if (errPresent == 'yes'){
    $(".formErr").show();
    $(".formSuccess").hide();
    event.preventDefault();
    // hide error message after 2 seconds
    setTimeout(function() {
      $(".formErr").hide();
    }, 2000);
  };
  // if no errors, display message and submit
  if (errPresent == 'no'){
    $(".formErr").hide();
    $(".formSuccess").show();
    // submit the form after a 2 sec delay
    setTimeout(function() {
      $("form").submit();
    }, 2000);
  };
});

////////////////////////////////////////
// End Event Handler Section
////////////////////////////////////////

////////////////////////////////////////
// End of JavaScript Program
////////////////////////////////////////
