// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require best_in_place



$(document).on('ready page:load', function () {
  $(".best_in_place").best_in_place();
});
  


$("document").ready(function(){

    $(".file-upload-1").change(function (event){
      if (this.files[0].size >= 4194304) {
        alert('File is too large (>4MB). Please try again.');
        event.preventDefault();
        return;
      }
      $('#saving-1').modal('show');
      $(this).closest('form').submit();
    });

    $("#file-upload-2").on("change",function() {
      console.log("change detected");
      $(this).closest("form").submit();
    });

    $(".inventory-index-page .add-product").on("click", function() {
      var product = prompt("Enter the name of the inventory product you want to add:");
      $.ajax({ url: '/inventories', type: 'post', data: { inventory: { product: product, quantity: '0', restaurant_id: $("#hidden-restaurant-id").val() } } })

    });
});

