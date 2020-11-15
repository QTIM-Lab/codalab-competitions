$('#submit-docker').click(function(){

  //copy from codalab/apps/web/static/js/Competition.js file

  $('#details').html('Creating new submission...');

  var competitionId = $("#competitionId").val()
  var description = $('#submission_description_textarea').val() || '';
  var method_name = $('#submission_method_name').val() || '';
  var method_description = $('#submission_method_description').val() || '';
  var project_url = $('#submission_project_url').val() || '';
  var publication_url = $('#submission_publication_url').val() || '';
  var bibtex = $('#submission_bibtex').val() || '';
  var team_name = $('#submission_team_name').val() || '';
  var organization_or_affiliation = $('#submission_organization_or_affiliation').val() || '';
  var phase_id = $('#submission_phase_id').val();

  // capture docker run command
  var docker_run_cmd = $('#docker-run-command').val();
  console.log(docker_run_cmd);
  // capture docker run command

  $('#submission_description_textarea').val('');

  // console.log('/api/competition/' + competitionId + '/submission?description=' + encodeURIComponent(description) +
  //                     '&method_name=' + encodeURIComponent(method_name) +
  //                     '&method_description=' + encodeURIComponent(method_description) +
  //                     '&project_url=' + encodeURIComponent(project_url) +
  //                     '&publication_url=' + encodeURIComponent(publication_url) +
  //                     '&bibtex=' + encodeURIComponent(bibtex) +
  //                     '&team_name=' + encodeURIComponent(team_name) +
  //                     '&organization_or_affiliation=' + encodeURIComponent(organization_or_affiliation) +
  //                     '&phase_id=' + encodeURIComponent(phase_id)+
  //                     '&docker-run-command='+ encodeURIComponent(docker_run_cmd)
  //             )

  $.ajax({
      url: '/api/competition/' + competitionId + '/submission?description=' + encodeURIComponent(description) +
                      '&method_name=' + encodeURIComponent(method_name) +
                      '&method_description=' + encodeURIComponent(method_description) +
                      '&project_url=' + encodeURIComponent(project_url) +
                      '&publication_url=' + encodeURIComponent(publication_url) +
                      '&bibtex=' + encodeURIComponent(bibtex) +
                      '&team_name=' + encodeURIComponent(team_name) +
                      '&organization_or_affiliation=' + encodeURIComponent(organization_or_affiliation) +
                      '&phase_id=' + encodeURIComponent(phase_id)+
                      '&docker-run-command='+ encodeURIComponent(docker_run_cmd),
      type: 'post',
      cache: false,
      async: false,
      data: {
          'id': 'trackingid',
          'name': '',
          'type': '',
          'size': ''
      }
  }).done(function(response) { 
      $('#details').html('');
      $('#user_results tr.noData').remove();
      $('#user_results').append(Competition.displayNewSubmission(response, 
                                                                 description, 
                                                                 method_name, 
                                                                 method_description, 
                                                                 project_url, 
                                                                 publication_url, 
                                                                 bibtex, 
                                                                 team_name, 
                                                                 organization_or_affiliation));
      $('#user_results #' + response.id + ' .glyphicon-plus').on('click', function() { Competition.showOrHideSubmissionDetails(this) });
      //$('#fileUploadButton').removeClass('disabled');
      //$('#fileUploadButton').text("Submit Results...");
      $('#user_results #' + response.id + ' .glyphicon-plus').click();
       location.reload(true);
  }).fail(function(jqXHR) {
      var msg = 'An unexpected error occurred.';
      if (jqXHR.status == 403) {
          msg = jqXHR.responseJSON.detail;
      }
      $('#details').html(msg);
      //$('#fileUploadButton').text("Submit Results...");
      $('#fileUploadButton').removeClass('disabled');
  });

  $('#submit-docker-dialog').modal('toggle');

});
