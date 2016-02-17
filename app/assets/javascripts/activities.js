


$(document).on('ready', function () {
    if ( typeof $('#activity-datatable').DataTable != "undefined" ) {
      $('#activity-datatable').DataTable( {
          "order": [[ 0, "desc" ]]
      });
    }
});
