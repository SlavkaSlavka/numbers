$(() => {

  // filter

  $('#show-advanced-search').on('click', function (e){
    e.preventDefault();
    e.stopPropagation();
    $('#advanced-search').removeClass('d-none');
    $('#show-advanced-search').remove();
  });

  function setQueryData(data) {
    let ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
  }

  var updateMask = false;
  var replacer = {
    'А':'A','В':'B','Е':'E','К':'K','М':'M','Н':'H','О':'O','Р':'P','С':'C','Т':'T','У':'Y','Х':'X'
  };
  $(function(){
    $('[data-letters]').on("keypress", function(event){
      var charCode = (typeof event.which == "undefined") ? event.keyCode : event.which;
      var charStr = String.fromCharCode(charCode);
      if (/[^ABEKMHOPCTYXАВЕКМНОРСТУХ]/i.test(charStr)) {
        return false;
      } else {
        if(/[АВЕКМНОРСТУХ]/i.test(charStr)) {
          event.preventDefault();
          $(event.delegateTarget).val(replacer[charStr.toUpperCase()]);
        }
        //focus on next element
        var cid = event.delegateTarget.id;
        var nid = cid.replace(/\d/, cid[cid.search(/\d/)]*1+1);
        if($("#"+nid).is(':visible')) {
          $("#"+nid).click();
          clearTimeout(updateMask);
          updateMask = setTimeout(loadFilter, 2000);
        } else {
          $(document).click();
          clearTimeout(updateMask);
          updateMask = setTimeout(loadFilter, 100);
        }
      }
    });
    $('[data-numbers]').on("keypress", function(event){
      var charCode = (typeof event.which == "undefined") ? event.keyCode : event.which;
      var charStr = String.fromCharCode(charCode);
      if (/[^\d]/.test(charStr)) {
        return false;
      }
      //focus on next element
      var cid = event.delegateTarget.id;
      var nid = cid.replace(/\d/, cid[cid.search(/\d/)]*1+1);
      if($("#"+nid).is(':visible')) {
        $("#"+nid).click();
        clearTimeout(updateMask);
        updateMask = setTimeout(loadFilter, 2000);
      } else {
        $(document).click();
        clearTimeout(updateMask);
        updateMask = setTimeout(loadFilter, 100);
      }
    });
    $('[data-letters],[data-numbers]').on("keydown", function (event) {
      //focus on previous element
      var charCode = (typeof event.which == "undefined") ? event.keyCode : event.which;
      if(charCode === 8) {
        $(event.delegateTarget).val("");
        var cid = event.delegateTarget.id;
        var nid = cid.replace(/\d/, cid[cid.search(/\d/)]*1-1);
        if($("#"+nid).is(':visible')) {
          $("#" + nid).click();
        }
        clearTimeout(updateMask);
        updateMask = setTimeout(loadFilter, 2000);
      }
    });
  });

  function showOtherRegion() {
    var params = {
      'autoSize': true,
      'fitToView': false,
      'padding': 20,
      afterClose: function () {
      }
    };
    $.fancybox($('#new-other-region-modal'), params);
  }

  $(document).on('click', '.dropdown-menu li', function (event) {
    var target = $(event.currentTarget);
    // изменение текста на номере
    var el = $('#' + target.parent().attr('aria-labelledby'));
    var cVal = target.data('value');
    if (cVal !== el.val()) {
      el.val(cVal);
    }

    loadFilter();
  });

  function loadFilter(){
    let mask = '';
    $('.filter-input').map(function() {
      let val = $(this).val();
      if(val === ''){
        val = '-';
      }
      return mask += val;
    });

    let data = {
      priceMin: $('#cost_from').val(),
      priceMax: $('#cost_to').val()
    };
    $('.filter__form input:checked').each(function(i, v) {
      let attr = $(v).attr('id');
      data[attr] = 1;
    });

    $('.btn-reset').removeClass('d-none');

    $.get('/$currentRegionAlias/'+mask, data,function(html) {
      $('.table-section__table').parent().html(html);
      initIS();
    });

    history.pushState(null,null, '/$currentRegionAlias/'+mask+"?"+setQueryData(data));
    history.replaceState(null,null, '/$currentRegionAlias/'+mask+"?"+setQueryData(data));

  }

  $('.filter__form input').on('change', function() {
    loadFilter();
  });

  // slider
  (() => {
    const options = {
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
          }
        },
      ],
    };
    const $slider = $('.slider__body').slick(options);
  })();
});