// set up global URLs  
var login_url = "http://clinic.evocare.co/api/authenticate";
var register_url = "http://clinic.evocare.co/api/register";
var patientList_url = "http://clinic.evocare.co/api/list_patients";
var patientTriageHistory_url = "http://clinic.evocare.co/api/patient_triage_history";
var crateNewTriage_url = "http://clinic.evocare.co/api/create_triage";
var onboard_url = "http://clinic.evocare.co/api/onboard_patient"
var getpharmacy_url= "http://clinic.evocare.co/api/get_patient_pharmacy";
var medicinename_url = "http://clinic.evocare.co/api/autocomplete_medication_terms";
var medicinestrength_url = "http://clinic.evocare.co/api/get_strength";
var uploadprescription_url = "http://clinic.evocare.co/api/save_prescription";
var api_key = "";

var medicine_id;
var prescription_array = {
                          drug:[],
                          dose:[],
                          dose_frequency:[],
                          dose_period_type:[],
                          dose_period_type:[],
                          dose_period_multiplier:[],
                          on_period_type:[],
                          on_period_multiplier:[],
                          off_period_type:[],
                          off_period_multiplier:[],
                          start_date:[],
                          end_date:[]
                        };
var pharmacy;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
    document.addEventListener("backbutton", function(e)
    {

       if($.mobile.activePage.is('#login_page'))
       {
        e.preventDefault();
        navigator.app.exitApp();
       }

       if($.mobile.activePage.is('#triage_page'))
       {
        console.log('reset triage page');
        navigator.app.backHistory();
        resetTriagePage();
       }
      if($.mobile.activePage.is('#checklist_page'))
       {
        console.log('reset checklist page');
        resetChecklistPage();
        navigator.app.backHistory();
       }


       if($.mobile.activePage.is('#vc_page'))
       {
        console.log('reset triage page');
        navigator.app.backHistory();
        resetVCPage();
       }

       if($.mobile.activePage.is('#onborading_page'))
       {
        resetOnBoardingPage();
        getPatientList("patients_page"); 
       }
       if($.mobile.activePage.is('#prescription_page'))
       {
        console.log('reset prescription page');
        navigator.app.backHistory();
        setTimeout(function(){resetPrescriptionPage('full');},500);
       }
       else 
       {
        navigator.app.backHistory();
       }
    }, false);

    
}


function resetTriagePage()
{
  $("#triage_form").trigger('reset'); 
  $('#triage_slide .carousel-inner .item').removeClass('active')
  $('#triage_slide .carousel-inner .item:first').addClass('active');
  $('#triage_slide .carousel_controls .right').text("CONTINUE");
  $('#triage_slide .carousel_controls .save_note').hide();
  $('#triage_slide .carousel_controls .right').show();
  $('#treatement_date').val();
  $('#blood_last_date').val('');
}

function resetOnBoardingPage()
{
  $('#onboarding_form').trigger('reset'); 
  $('#onboarding_birthday').val('');
  var image = document.getElementById("onboarding_avatar");
  image.src = "img/ChooseAvatar.png";
}


function resetChecklistPage(){  
  $("#triage_form").trigger('reset'); 
  $('#checklist_slide .carousel-inner .item').removeClass('active')
  $('#checklist_slide .carousel-inner .item:first').addClass('active');
  $('#checklist_slide .carousel_controls .add_btn').hide();
  $('#checklist_slide .carousel_controls .save_btn').hide();
  $('#checklist_slide .carousel_controls .right').show("CONTINUE");
}

function resetVCPage()
{
  $('#vc_form').trigger('reset');
  $('#vc_slide .carousel-inner .item').removeClass('active')
  $('#vc_slide .carousel-inner .item:first').addClass('active');
  $('#vc_treatment_last_date').val('');
  $('#vc_blood_last_date').val('');
}

function resetPrescriptionPage(part){
  prescription_array = {
                          drug:[],
                          dose:[],
                          dose_frequency:[],
                          dose_period_type:[],
                          dose_period_type:[],
                          dose_period_multiplier:[],
                          on_period_type:[],
                          on_period_multiplier:[],
                          off_period_type:[],
                          off_period_multiplier:[],
                          start_date:[],
                          end_date:[]
                        };
                        
  $('#prescription_form').trigger('reset');
  $("#prescription_slide .carousel_controls .full_width_btn .right").attr('disabled','disabled');
  $("#search_medicine_name").parent('.row').children('form').children('.ui-input-search').children('input').val('');
  $("#search_medicinine_strength").parent('.row').children('form').children('.ui-input-search').children('input').val('');
  $('#start-date').val('');
  $('#end-date').val('');
  $('#prescription_slide').carousel(0);

  if(typeof(part) === "string"){
    
    $("#prescription_list").html('').listview('refresh');
    $(".prescription_detail .prescription_detail_drug").html('');

  }
  
}

function resetPrescriptionPage2(part){
  /*prescription_page2*/
  $('#prescription_page2 form').trigger('reset');
  $("#medicine_name_input").parent('.row').children('form').children('.ui-input-search').children('input').val('');
  $("#drug_strength_label").text('');
  $("#drug_dosage_label").text('');
  $("#drug_frequency_label").text('');
  /*prescripition_strength*/
  $('#prescription_strength #strength_list').listview().html('').listview('refresh');
  
  /*prescription_dosage*/
  $("#drug_dosage_input").val(0);
  /*prescription_frequency*/
  $("#prescription_frequency form").trigger('reset');  
  $("#drug-frequency").val(1);
  $("#drug-period-multiplier").val(1);
  $("#prescription_frequency #on-period-multiplier").val(0);
  $("#prescription_frequency #off-period-multiplier").val(0);
  $("#prescription_frequency #dose-period-type").val('Daily').change();
  $("#prescription_frequency #on-period-type").val('Daily').change();
  $("#prescription_frequency #off-period-type").val('Daily').change();
  $('#drug-end-date').val('');
  var current_date = new Date();
  var month= ["JAN", "FEB", "MAR", "APR", "MAY", "JUN","JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  $("#drug-start-date").val(current_date.getDate()+"-"+month[current_date.getMonth()]+"-"+current_date.getFullYear());
    


  if(typeof(part) === "string"){
    prescription_array = {
                          drug:[],
                          dose:[],
                          dose_frequency:[],
                          dose_period_type:[],
                          dose_period_type:[],
                          dose_period_multiplier:[],
                          on_period_type:[],
                          on_period_multiplier:[],
                          off_period_type:[],
                          off_period_multiplier:[],
                          start_date:[],
                          end_date:[]
                        };
                        
    $("#prescription_list_page #prescription_list").html('').listview('refresh');
    $("#prescription_detail_page .prescription_detail .prescription_detail_drug").html('');

  }
}
