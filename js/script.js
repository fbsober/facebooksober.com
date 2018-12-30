
(function (window) {
  'use strict';

  flatpickr(".datepicker", {
    inline: false,
    maxDate: 'today', 
    locale: {
      firstDayOfWeek: 1, 
      weekdays: {
        shorthand: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
      },
      rangeSeparator: '-',
    },
    appendTo: document.getElementById('datepickerWrapperFrom'),
    onDayCreate: function(){}, 
    onChange: function(selectedDates, dateStr, instance) {
      var newDate;
      newDate = selectedDates[0];
      $('input[name="DELETED_AT[day]"]').val(newDate.getDate());
      $('input[name="DELETED_AT[month]"]').val(newDate.getMonth()+1);
      $('input[name="DELETED_AT[year]"]').val(newDate.getFullYear());
    }
  });

  $.each($('.timeago'), function(i, elm){
    var timeAgo, origDate;
    origDate = new Date($(elm).text());
    timeAgo = $.timeago(origDate)
    $(elm).text(timeAgo.replace(' ago', ''));
  })

  var $form = $('#mc-embedded-subscribe-form')
  if ($form.length > 0) {
    $('form button[type="submit"]').on('click', function (event) {
      if (event) event.preventDefault()
      register($form)
    })
  }

  function loadTwitterButton(name, period){
    // Twitter
    var t = $("<a href='https://twitter.com/share' class='twitter-share-button' class='twitter-share-button'>");
    var tjs = $('<script>').attr('src', 'https://platform.twitter.com/widgets.js');
    $('#twitterholder').empty();
    $(t).attr('data-text', "Hi my name is " + name + ". I'm a " + period + " FBS (Facebook Sober).");
    $(t).attr('data-url', 'https://facebooksober.com');
    $(t).attr('data-hashtags', 'facebooksober');
    $(t).attr('data-show-count', false);
    $(t).attr('data-size', 'large');
    $(t).appendTo($('#twitterholder'));
    $(tjs).attr('async', '')
    $(tjs).attr('charset', 'utf-8')
    $(tjs).appendTo($('#twitterholder'));
  }


  function register($form) {
    // $('#mc-embedded-subscribe').val('Sending...');
    $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      cache: false,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
      success: function (data) {
        var fname, period;
        $('#mc-embedded-subscribe').val('subscribe')
        if (data.result === 'success') {
          // Yeahhhh Success
          console.log(data.msg)
          $('.join-us-form').slideUp('slow', function(){
            $('.thank-you').slideDown('slow', function(){
              canvas.setAttribute("style", canvasStyles), canvas.setAttribute("id", "world"), body.appendChild(canvas);
            })
            fname  = $('#mce-FNAME').val();
            period = $.timeago($('.flatpickr-input').val()).replace(' ago', '');
            $('#first_name').text(fname + ', ');
            loadTwitterButton(fname, period);
          })
        } else {
          // Something went wrong, do something to notify the user.
          console.log(data.msg)
          $('#mce-EMAIL').css('borderColor', '#ff8282')
          $('#subscribe-result').css('color', '#ff8282')
          $('#subscribe-result').html('<p>' + data.msg.substring(4) + '</p>')
        }
      }
    })
  };
}(window));