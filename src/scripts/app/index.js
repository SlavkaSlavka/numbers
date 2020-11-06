import 'slick-carousel';

$(() => {
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
    const $slider = $('.slider').slick(options);
  })();
});