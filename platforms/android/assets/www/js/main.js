var patients_list = "";
var global_patient_id = "";
var uploadAvatar = false;

function loadPatientInfo(page_id)
{
	// load patient list 
	getPatientList(page_id);
}

function getPatientList(page_id)
{
	$.ajax(
		{
    		url : patientList_url,
    		type: "POST",
    		data : {key: api_key},
    		dataType: 'json',
    		success: function(response)
    		{
    			if(response.status == "1")
    			{
            var output = [];
            patients_list = response.patients;

            //if user click virtual clinic
            if(page_id == "virtual_clinic_page")
            {
              $.each(response.patients, function(index, value)
              {
                output += '<li class="patient" data-icon="false"><div id="' + value.id + '" onClick="setUpVCPage(this.id)"><div class="col-xs-4 col-md-3 patient_photo text-center"><img class="img-circle" src="' + value.avatar + '"></div><div class="col-xs-8 col-md-9 patient_info"><div class="row"><p class="patient_name">' + value.full_name + '</p></div><div class="row"><p class="patient_date">' + value.gender.substring(0,1).toUpperCase() + ' . ' + value.date_of_birth + '</p></div><div class="row"><p class="patient_issue">' +value.condition + '</p></div></div></div></li>';
              });

              $('#patient_list').children('ul').empty();
              $('#patient_list').children('ul').append(output).listview().listview('refresh');

              // navigate to patientlist page after updating
              $.mobile.changePage("#patientlist_page", 
              {
                transition: "slide",
                reverse: false,
                changeHash: true
              });
            }
            // if user click triage page
            if(page_id == "patient_triage_page")
           {
              $('#onboarding_btn').hide();

              $.each(response.patients, function(index, value)
              {
                output += '<li class="patient" data-icon="false"><div id="' + value.id + '" onClick="setUpTriagePage(this.id)"><div class="col-xs-4 col-md-3 patient_photo text-center"><img class="img-circle" src="' + value.avatar + '"></div><div class="col-xs-8 col-md-9 patient_info"><div class="row"><p class="patient_name">' + value.full_name + '</p></div><div class="row"><p class="patient_date">' + value.gender.substring(0,1).toUpperCase() + ' . ' + value.date_of_birth + '</p></div><div class="row"><p class="patient_issue">' +value.condition + '</p></div></div></div></li>';
              });

              $('#patient_list').children('ul').empty();
              $('#patient_list').children('ul').append(output).listview().listview('refresh');

              // navigate to patientlist page after updating
              $.mobile.changePage("#patientlist_page", 
              {
                transition: "slide",
                reverse: false,
                changeHash: true
              });
            }

            // if user click patients page
            if(page_id == "patients_page")
            {
              // display onboarding button
              $('#onboarding_btn').show();


              $.each(response.patients, function(index, value)
              {
                output += '<li class="patient" data-icon="false"><div id="' + value.id + '" onClick="patientSelected(this.id,this)"><div class="col-xs-3 patient_photo text-center"><img class="img-circle" src="' + value.avatar + '"></div><div class="col-xs-9 patient_info"><div class="row"><p class="patient_name">' + value.full_name + '</p></div><div class="row"><p class="patient_date">' + value.gender.substring(0,1).toUpperCase() + ' . ' + value.date_of_birth + '</p></div><div class="row"><p class="patient_issue">' +value.condition + '</p></div></div></div></li>';
              });

              $('#patient_list').children('ul').empty();
              $('#patient_list').children('ul').append(output).listview().listview('refresh');

              // navigate to patientlist page after updating
              $.mobile.changePage("#patientlist_page", 
              {
                transition: "slide",
                reverse: false,
                changeHash: true
              });
            }

            // if user click consultant page
            if(page_id == "consultant_page")
            {
              $('#onboarding_btn').hide();

              $.each(response.patients, function(index, value)
              {
                output += '<li class="patient" data-icon="false"><div id="' + value.id + '" onClick="setUpConulstantPage(this.id)"><div class="col-xs-3 patient_photo text-center"><img class="img-circle" src="' + value.avatar + '"></div><div class="col-xs-9 patient_info"><div class="row"><p class="patient_name">' + value.full_name + '</p></div><div class="row"><p class="patient_date">' + value.gender.substring(0,1).toUpperCase() + ' . ' + value.date_of_birth + '</p></div><div class="row"><p class="patient_issue">' +value.condition + '</p></div></div></div></li>';
              });

              $('#patient_list').children('ul').empty();
              $('#patient_list').children('ul').append(output).listview().listview('refresh');

              // navigate to patientlist page after updating
              $.mobile.changePage("#patientlist_page", 
              {
                transition: "slide",
                reverse: false,
                changeHash: true
              });
            }

            if(page_id == "assign_content_list"){
              $.each(response.patients, function(index, value)
              {
                output += '<li class="patient" data-icon="false"><div id="' + value.id + '"><div class="col-xs-3 patient_photo text-center"><img class="img-circle" src="' + value.avatar + '"></div><div class="col-xs-9 patient_info"><div class="row"><p class="patient_name">' + value.full_name + '</p></div><div class="row"><p class="patient_date">' + value.gender.substring(0,1).toUpperCase() + ' . ' + value.date_of_birth + '</p></div><div class="row"><p class="patient_issue">' +value.condition + '</p></div></div></div></li>';
              });
              
              $("#checklist_assign_content .row ul").empty();
              $("#checklist_assign_content .row ul").append(output).listview('refresh');

            }
            if(page_id == "prescription_page")
            {
              $.each(response.patients, function(index, value)
              {
                output += '<li class="patient" data-icon="false"><div id="' + value.id + '" onClick="setUpPrescriptionPage(this.id)"><div class="col-xs-4 col-md-3 patient_photo text-center"><img class="img-circle" src="' + value.avatar + '"></div><div class="col-xs-8 col-md-9 patient_info"><div class="row"><p class="patient_name">' + value.full_name + '</p></div><div class="row"><p class="patient_date">' + value.gender.substring(0,1).toUpperCase() + ' . ' + value.date_of_birth + '</p></div><div class="row"><p class="patient_issue">' +value.condition + '</p></div></div></div></li>';
              });

              $('#patient_list').children('ul').empty();
              $('#patient_list').children('ul').append(output).listview().listview('refresh');

              // navigate to patientlist page after updating
              $.mobile.changePage("#patientlist_page", 
              {
                transition: "slide",
                reverse: false,
                changeHash: true
              });
            }
    			}
    			else
    			{
    				alert("Sorry, cannot load your patient list");
    			}
    		},
    		error: function (error)
    		{
    			alert("Sorry, failed to load patient list. Please check your network and try again later");
    		}
		});
}

//load data and fill in the VC Page
function setUpVCPage(patient_id)
{
  global_patient_id = patient_id;

    // get single patient info by id
    var single_patient = getSinglePatientInfo(patient_id);

    // set up patient info on triage page header
    var output = '<div class="col-xs-3 vertical-middle"><img src="' +single_patient.avatar + '" class="img-circle img-responsive"></div><div class="col-xs-9 vertical-middle"><div class="row"><div class="col-xs-6 patient_name md-size">' + single_patient.full_name + '</div><div class="col-xs-1 light-font gender">'+single_patient.gender.substring(0,1)+'</div><div class="col-xs-5 light-font birth_date">' + single_patient.date_of_birth + '</div></div><div class="row"><div class="col-xs-12 light-font disease_issue">' + single_patient.condition + '</div></div></div>';
    $('#vc_info').first().html(output);

    // get patient triage history
    $.ajax(
    {
        url : patientTriageHistory_url,
        type: "POST",
        data : {key: api_key, patient: patient_id},
        dataType: 'json',
        success: function(response)
        {
          if(response.status == "1")
          {
            setUpVCContent(response);
          }
          else
          {
            alert("Sorry, cannot load patient triage history");
          }
        },
        error: function (error)
        {
          alert("Sorry, failed to load patient triage history. Please check your network and try again later");
        }
    });
}
//load data and fill in the Triage Page
function setUpTriagePage(patient_id)
{
    global_patient_id = patient_id;

    // get single patient info by id
    var single_patient = getSinglePatientInfo(patient_id);

    // set up patient info on triage page header
    var output = '<div class="col-xs-3 vertical-middle"><img src="' +single_patient.avatar + '" class="img-circle img-responsive"></div><div class="col-xs-9 vertical-middle"><div class="row"><div class="col-xs-6 patient_name md-size">' + single_patient.full_name + '</div><div class="col-xs-1 light-font gender">'+single_patient.gender.substring(0,1)+'</div><div class="col-xs-5 light-font birth_date">' + single_patient.date_of_birth + '</div></div><div class="row"><div class="col-xs-12 light-font disease_issue">' + single_patient.condition + '</div></div></div>';
    $('#triage_info').first().html(output);

    // get patient triage history
    $.ajax(
    {
        url : patientTriageHistory_url,
        type: "POST",
        data : {key: api_key, patient: patient_id},
        dataType: 'json',
        success: function(response)
        {
          if(response.status == "1")
          {
            setUpPatientTriageContent(response);
          }
          else
          {
            alert("Sorry, cannot load patient triage history");
          }
        },
        error: function (error)
        {
          alert("Sorry, failed to load patient triage history. Please check your network and try again later");
        }
    });
}

function setUpVCContent(response)
{
  var total_clinic_visits = response.total_clinic_visits;
  var total_patients = response.total;

  var total_trend = (total_clinic_visits/total_patients) * 100;

  // set up triage trend page
  $('#vc_slide .patient_contacts').text(total_patients);
  $('#vc_slide .clinic_visit').text(total_clinic_visits);

   setTimeout(function()
   {
    showPercentDonut('#vc_pie_chart',total_trend);
   }, 1000);


  // set up triage timeline
  var triage_time_data = [];
  $.each(response.list, function(index, value)
  {
    if(value.clinic_visit == false)
    {
       triage_time_data += '<li class="timeline_item"><div class="date col-xs-4 md-size">' + value.date + '</div><div class="status col-xs-4 col-xs-offset-4"><i class="fa fa-2x fa-angle-right"></i><i class="fa fa-2x fa-close"></i></div></li>';
    }

    if(value.clinic_visit == true)
    {
       triage_time_data += '<li class="timeline_item visited "><div class="date col-xs-4 md-size">' + value.date + '</div><div class="status col-xs-4 col-xs-offset-4"><i class="fa fa-2x fa-angle-right"></i><div><span>Clinic<br>visit</span></div></div></li>';
    }
   
  });

  $('#vc_timeline').empty();
  $('#vc_timeline').append(triage_time_data).listview().listview('refresh');

  $.mobile.changePage("#vc_page", 
  {
    transition: "slide",
    reverse: false,
    changeHash: true
  });

}

function setUpPatientTriageContent(response)
{
  var total_clinic_visits = response.total_clinic_visits;
  var total_patients = response.total;

  var total_trend = (total_clinic_visits/total_patients) * 100;

  // set up triage trend page
  $('#triage_slide .patient_contacts').text(total_patients);
  $('#triage_slide .clinic_visit').text(total_clinic_visits);

   setTimeout(function()
   {
    showPercentDonut('#triage_pie_chart', total_trend);
   }, 1000);


  // set up triage timeline
  var triage_time_data = [];
  $.each(response.list, function(index, value)
  {
    if(value.clinic_visit == false)
    {
       triage_time_data += '<li class="timeline_item"><div class="date col-xs-4 md-size">' + value.date + '</div><div class="status col-xs-4 col-xs-offset-4"><i class="fa fa-2x fa-angle-right"></i><i class="fa fa-2x fa-close"></i></div></li>';
    }

    if(value.clinic_visit == true)
    {
       triage_time_data += '<li class="timeline_item visited "><div class="date col-xs-4 md-size">' + value.date + '</div><div class="status col-xs-4 col-xs-offset-4"><i class="fa fa-2x fa-angle-right"></i><div><span>Clinic<br>visit</span></div></div></li>';
    }
   
  });

  $('#triage_timeline').empty();
  $('#triage_timeline').append(triage_time_data).listview().listview('refresh');

  $.mobile.changePage("#triage_page", 
  {
    transition: "slide",
    reverse: false,
    changeHash: true
  });
}

// one patient selected on Patients page
function patientSelected(patient_id,element)
{
  // get single patient info by id
  var single_patient = getSinglePatientInfo(patient_id);
  
  // setup user info in patientlist left slide page
  // if($(element).parent('li').hasClass('selected'))
  // {
  //   $(element).parent('li').removeClass('selected');
  // }
  // else
  // {
  //   $('#patient_list_view li').removeClass('selected'); 
  //   $(element).parent('li').addClass('selected');
  //   $('#patientlist_menu .patient_info img').attr('src', single_patient.avatar);
  //   $('#patientlist_menu .patient_info .patient_name').text(single_patient.full_name);
  //   $('#patientlist_menu .patient_info .birth_date').text(single_patient.date_of_birth);
  //   $('#patientlist_menu .patient_info .disease_issue').text(single_patient.condition);
  // }
}

function setUpConulstantPage(patient_id)
{
   global_patient_id = patient_id;

  // get single patient info by id
  var single_patient = getSinglePatientInfo(patient_id);

  console.log(single_patient);
}

function getSinglePatientInfo(patient_id)
{
    var i = null;
    for(i = 0; i<patients_list.length; i++)
    {  
        if(patients_list[i].id === patient_id)
        {
            return patients_list[i];
        }
    }
    return null;
}

function showPercentDonut(element_id, percent) 
{
    console.log(element_id + " " + percent);
    var target = $(element_id);
    console.log(target);
    target.empty();
    var width= target.width(),
        height = target.height(),
        radius = Math.min(width, height)/2,
        dig = radius/6,
        color = d3.scale.ordinal()
                  .range(["#228896","#A0b2b7"]),
        center = [width/2, height/2],
        dataset = 
        {
            lower: [0, 100],
            upper: [percent, 100-percent]
        },
        pie = d3.layout.pie().sort(null),
        format = d3.format(".0%");
    
    var arc = d3.svg.arc()
        .innerRadius(radius - 2 - dig)
        .outerRadius(radius -5);

    var svg = d3.select(element_id).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr('transform', 'translate(' + center[0] + ', ' + center[1] + ')');

    var path = svg.selectAll("path")
        .data(pie(dataset.lower))
        .enter().append("path")
        .attr('fill', function (d, i) { return color(i); })
        .attr("d", arc)
        .each(function(d) { this._current = d; }); // store the initial values

    var text = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "pie_chart_text")
        .attr("fill", "#A0b2b7")
        .attr("dy",".4em");

   if (typeof(percent) == "string")
   {
     text.text(percent);
   }
   else 
   {
     var progress = 0;
     var timeout = setTimeout(function ()
    {
       clearTimeout(timeout);
       path = path.data(pie(dataset.upper)); // update the data
       path.transition().duration(1200).attrTween("d", function (a) 
       {
         var i  = d3.interpolate(this._current, a);
         var i2 = d3.interpolate(progress, percent);
         this._current = i(0);
         return function(t) 
         {
           text.text( format(i2(t) / 100) );
           return arc(i(t));
        };
      }); // redraw the arcs
    }, 100);
  }
}

function createNewTriage()
{

  var on_treatment = $('#on_treatment').children().children('label');
  if(on_treatment.hasClass("ui-radio-on"))
  {
    on_treatment = false;
  }
  else
  {
    on_treatment = true;
  }

  var treatment_name = $('#treatment_name').val();
  var treatment_last_date = $('#treatment_last_date').val();
  var blood_last_date = $('#blood_last_date').val();

  var symptoms = new Array();
  
  var treatment_symptom = $('#treatment_symptom').val();
  if(treatment_symptom.trim())
  {
    symptoms.push(treatment_symptom);
  }

  $('.symptom_chooselist input:checked').each(function() 
  {
    symptoms.push($(this).val());
  });

  var pain_grade = $("#nci_grade").val();

  var history_pain = $('#history_record').children().children('label');
  if(history_pain.hasClass("ui-radio-on"))
  {
    on_treatment = false;
  }
  else
  {
    history_pain = true;
  }

  var pain_character = ""
  $('#pain_character input:checked').each(function() 
  {
    pain_character = $(this).val();
  });

  var new_triage_data = {key: api_key, patient: global_patient_id, on_treatment: on_treatment, treatment: treatment_name, 
                        date_last_treatment: treatment_last_date, last_bloods: blood_last_date, symptoms: symptoms, pain_grade: pain_grade,
                        has_history_of_pain: history_pain, character_of_pain: pain_character};

  //get patient triage history
  $.ajax(
    {
        url : crateNewTriage_url,
        type: "POST",
        data : new_triage_data,
        dataType: 'json',
        success: function(response)
        {
          if(response.status == "1")
          {
            alert(response.message);
            
            // reset triage form after create a new triage successfully
            resetTriagePage();
            $('#triage_slide .carousel_controls .save_note').hide();
            $('#triage_slide .carousel_controls .right').show();
            
            $.mobile.changePage("#patientlist_page", 
            {
              transition: "pop",
              reverse: false,
              changeHash: false
            });
          }
          else
          {
            alert("Sorry, cannot create new triage");
          }
        },
        error: function (error)
        {
          alert("Sorry, failed to create new triage. Please check your network and try again later");
        }
    });

}

function onBoardingSave()
{
  // get data from onboarding form
  var onboard_full_name = $("#onboarding_fullname").val();
  var onboard_email = $("#onboarding_email").val();

  var onboard_gender = "";
  $('#onboarding_gender input:checked').each(function() 
  {
    onboard_gender = $(this).val();
  });

  var onboard_home_phone = $('#onboarding_home_number').val();
  var onboard_mobile = $('#onboarding_mobile_number').val();
  var onboard_birth_date = $('#onboarding_birthday').val();
  var onboard_occupation = $('#onboarding_occupation').val();
  var onboard_patient_address = $('#onboarding_address').val();
  var onboard_country = $('#country_selector').val();


  var onboard_medical_card = $('#onboarding_medical_card').children().children('label');
  if(onboard_medical_card.hasClass("ui-radio-on"))
  {
    onboard_medical_card = false;
  }
  else
  {
    onboard_medical_card = true;
  }

  var onboard_insurance = "";
  $('#onboarding_insurance input:checked').each(function() 
  {
    onboard_insurance = $(this).val();
  });

  var onboard_pps = $('#onboarding_pps').val();
  
  var onboard_kin1_fullname = $('#onboarding_kin1_fullname').val();
  var onboard_kin1_address = $('#onboarding_kin1_address').val();
  var onboard_kin1_phone = $('#onboarding_kin1_phone').val();

  var onboard_kin2_fullname = $('#onboarding_kin2_fullname').val();
  var onboard_kin2_address = $('#onboarding_kin2_address').val();
  var onboard_kin2_phone = $('#onboarding_kin2_phone').val();

  var onboard_past_medicine = $('#onboarding_does_takeing').val();
  var onboard_allergies = $('#onboarding_allergies_history').val();
  var onboard_problem_period = $('#onboarding_problem_period').val();
  var onboard_religious = $('#onboarding_religious').val();

  var onboard_gp_fullname = $('#onboarding_gp_full_name').val();
  var onboard_gp_address = $('#onboarding_gp_address').val();
  var onboard_gp_phone = $('#onboarding_gp_phoneNo').val();

  var onboard_pharmacy_fullname = $('#onboarding__pharmacy_name').val();
  var onboard_pharmacy_address = $('#onboarding__pharmacy_address').val();
  var onboard_pharmacy_phone = $('#onboarding__pharmacy_phoneNo').val();

  var onboard_diabetes= $('#onboarding_diabetes').children().children('label');
  if(onboard_diabetes.hasClass("ui-radio-on"))
  {
    onboard_diabetes = false;
  }
  else
  {
    onboard_diabetes = true;
  }

  var onboard_blood_pressure= $('#onboarding_blood_pressure').children().children('label');
  if(onboard_blood_pressure.hasClass("ui-radio-on"))
  {
    onboard_blood_pressure = false;
  }
  else
  {
    onboard_blood_pressure = true;
  }

  var onboard_heart_disease= $('#onboarding_heart_disease').children().children('label');
  if(onboard_heart_disease.hasClass("ui-radio-on"))
  {
    onboard_heart_disease = false;
  }
  else
  {
    onboard_heart_disease = true;
  }

  var onboard_asthma= $('#onboarding_asthma').children().children('label');
  if(onboard_asthma.hasClass("ui-radio-on"))
  {
    onboard_asthma = false;
  }
  else
  {
    onboard_asthma = true;
  }

  var onboard_epilepsy= $('#onboarding_epilepsy').children().children('label');
  if(onboard_epilepsy.hasClass("ui-radio-on"))
  {
    onboard_epilepsy = false;
  }
  else
  {
    onboard_epilepsy = true;
  }

  var onboard_cancer= $('#onboarding_cancer').children().children('label');
  if(onboard_cancer.hasClass("ui-radio-on"))
  {
    onboard_cancer = false;
  }
  else
  {
    onboard_cancer = true;
  }

  var onboard_data = {key: api_key, full_name: onboard_full_name, email: onboard_email, gender: onboard_gender, telephone: onboard_home_phone,
                      date_of_birth: onboard_birth_date, occupation: onboard_occupation, address: onboard_patient_address, nationality: onboard_country,
                      has_medical_card: onboard_medical_card, medical_insurance: onboard_insurance, pps: onboard_pps, kin1_full_name: onboard_kin1_fullname,
                      kin1_address: onboard_kin1_address, kin1_telephone: onboard_kin1_phone, kin2_full_name: onboard_kin2_fullname,
                      kin2_address: onboard_kin2_address, kin2_telephone: onboard_kin1_phone, past_medicine: onboard_past_medicine, allergies: onboard_allergies,
                      religious_beliefs: onboard_religious, gp_full_name: onboard_gp_fullname, gp_address: onboard_gp_address, gp_telephone: onboard_gp_phone,
                      pharmacy_full_name: onboard_pharmacy_fullname, pharmacy_address: onboard_pharmacy_address, pharmacy_telephone: onboard_pharmacy_phone, 
                      family_history_diabetes: onboard_diabetes, family_history_blood_pressure: onboard_blood_pressure, family_history_heart_disease: onboard_heart_disease,
                      family_history_asthma: onboard_asthma, family_history_epilepsy: onboard_epilepsy, family_history_cancer: onboard_cancer};

  if(uploadAvatar == true)
  {
    var imageURI = document.getElementById('onboarding_avatar').getAttribute("src");    
    var options = new FileUploadOptions();
    options.fileKey = "avatar";
    options.mimeType = "image/jpg";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.chunkedMode = false;
    options.params = onboard_data;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI(onboard_url), avatarTransferSuccess, avatarTransferFailure, options);
  }

  if(uploadAvatar == false)
  {
     $.ajax(
    {
        url : onboard_url,
        type: "POST",
        data : onboard_data,
        dataType: 'json',
        success: function(response)
        {
          if(response.status == "1")
          {
            alert(response.message);

            // reset triage form after create a new triage successfully
            resetOnBoardingPage();
            getPatientList("patients_page");
          }
          else
          {
            alert(response.message);
          }
        },
        error: function (error)
        {
          alert("Sorry, some errors occurred. Please try again later");
        }
    });

  }

}

function avatarTransferSuccess(response)
{ 
   var result = $.parseJSON(response.response);

   if(result.status == "1")
   {
      uploadAvatar = false;
      alert(result.message);

      // reset triage form after create a new triage successfully
      resetOnBoardingPage();
      getPatientList("patients_page"); 

      // clean the cache
      var imageURI = document.getElementById('onboarding_avatar').getAttribute("src"); 
      deletePictureFromCache(imageURI);
    }
    else
    {
      alert(result.message);
    }
}

function avatarTransferFailure(error)
{ 
  alert("Sorry, some errors occurred. Please try again later");
  console.log($.parseJSON(error));
}

function onBoardingBack()
{
    $.mobile.changePage("#patientlist_page", 
    {
      transition: "slide",
      reverse: false,
      changeHash: true
    });
}


var avatar_page = "";
// onboarding page requries user avatar 
function selectAvatar(element)
{
  avatar_page = element;

  navigator.notification.confirm
   (
      'Choose Profile Picture',  // message
      onConfirm,         // callback
      'Select',            // title
      ['Choose from Library', 'Take Photo']  // buttonName
   );
}

function onConfirm(buttonIndex) 
{
  // choose from library
  if(buttonIndex == 1)
  {
    navigator.camera.getPicture(onAvatarSuccess, onFail, 
    {
      quality: 100,
      allowEdit: true,
      targetWidth:160,
      targetHeight: 160,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY, 
      mediaType : Camera.MediaType.PICTURE,
      correctOrientation: true
    });
  }

  // take photo 
  if(buttonIndex == 2)
  {
    navigator.camera.getPicture(onAvatarSuccess, onFail, 
    {
      quality: 100, 
      allowEdit: true,
      targetWidth:160,
      targetHeight: 160,
      destinationType: Camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: false,
      correctOrientation: true
    });
  }
}

function onAvatarSuccess(imageURI)
{
  uploadAvatar = true;

  if(avatar_page == "onboarding_avatar")
  {
    var image = document.getElementById("onboarding_avatar");
    image.src = imageURI;
  }

  if(avatar_page == "signup_avatar")
  {
    // display the selected image
    $('.signup_avatar_lg').attr('src', imageURI);
    $('.signup_avatar_mini').attr('src', imageURI);
  }
}

function onFail(message)
{
  console.log('Failed because: ' + message);
}

function deletePictureFromCache( imageURI )
{
  window.resolveLocalFileSystemURI(imageURI, function( fileEntry )
  {
    fileEntry.remove();
  }, null);
}

function setUpPrescriptionPage(patient_id){
  global_patient_id = patient_id;

    // get single patient info by id
    var single_patient = getSinglePatientInfo(patient_id);

    // set up patient info on prescription page header
    var output = '<div class="col-xs-3 vertical-middle"><img src="' +single_patient.avatar + '" class="img-circle img-responsive"></div><div class="col-xs-9 vertical-middle"><div class="row"><div class="col-xs-6 patient_name md-size">' + single_patient.full_name + '</div><div class="col-xs-1 light-font gender">'+single_patient.gender.substring(0,1)+'</div><div class="col-xs-5 light-font birth_date">' + single_patient.date_of_birth + '</div></div><div class="row"><div class="col-xs-12 light-font disease_issue">' + single_patient.condition + '</div></div></div>';
    $('#prescription_page .patient_detail').first().html(output);
    $('#prescription_page .patient_detail').height($('#prescription_page .patient_detail').height());
    $('#prescription_page .patient_detail').attr("id",patient_id);
    $.ajax(
    {
        url : getpharmacy_url,
        type: "POST",
        data : {key:api_key,patient:patient_id},
        dataType: 'json',
        success: function(response)
        {
          if(response.status == "1")
          {
            
            console.log(JSON.stringify(response.pharmacy));
            var latitude = response.pharmacy.latitude;
            var longitude = response.pharmacy.longitude;
            var address_array = response.pharmacy.address.split(' ');
            var location_string = "geo: "+latitude+','+longitude;
            var q = '?q='+address_array[0];
            for(var i = 1;i<address_array.length;i++){
              q=q+'+'+address_array[i];
            }
            $('.prescription_detail .prescription_detail_pharmacy label').text("Pharmacy: "+response.pharmacy.name);
            $('.prescription_detail .prescription_detail_pharmacy a').attr("href", location_string+q);
            pharmacy = response.pharmacy;
            console.log(JSON.stringify(pharmacy));
          }
          else
          {
            alert(response.message);
          }
        },
        error: function (error)
        {
          alert("Sorry, some errors occurred. Please try again later");
        }
    });
    $.mobile.changePage("#prescription_page", 
    {
      transition: "slide",
      reverse: false,
      changeHash: true
    });

    

    disablePrescription();
}

//upload prescription_array to the server through API call
function uploadPrescription(){
  var patient_id = $('#prescription_page .patient_detail').attr("id");
  var key_array = { key:api_key,
                    patient: patient_id,
                    pharmacy_full_name: pharmacy.name,
                    pharmacy_address: pharmacy.address,
                    pharmacy_telephone: pharmacy.telephone,
                    drug: prescription_array.drug,
                    dose: prescription_array.dose,
                    dose_frequency: prescription_array.dose_frequency,
                    dose_period_type: prescription_array.dose_period_type,
                    dose_period_multiplier: prescription_array.dose_period_multiplier,
                    on_period_type: prescription_array.on_period_type,
                    on_period_multiplier: prescription_array.on_period_multiplier,
                    off_period_type: prescription_array.off_period_type,
                    off_period_multiplier: prescription_array.off_period_multiplier,
                    start_date: prescription_array.start_date,
                    end_date: prescription_array.end_date
                  }
  console.log(JSON.stringify(key_array));
  $.ajax(
    {
        url :uploadprescription_url,
        type: "POST",
        data : key_array,
        dataType: 'json',
        success: function(response)
        {
            alert("Prescription is updated")
        },
        error: function (error)
        {
          alert("Sorry, some errors occurred. Please try again later");
        }
    });
    $.mobile.changePage("#patientlist_page", 
    {
      transition: "slide",
      reverse: false,
      changeHash: true
    });
    resetPrescriptionPage('full');
    disablePrescription();
}