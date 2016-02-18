


$(document).on('ready', function () {
    if ( $('#activity-datatable').length > 0 ) {
      $('#activity-datatable').DataTable( {
          "order": [[ 0, "desc" ]]
      });
    }
});
