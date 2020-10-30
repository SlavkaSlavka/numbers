import 'select2/dist/js/select2.min';
import 'select2/dist/css/select2.min.css';

$(()=>{
    //simple select
    (() => {
        const $select = $('select');

        $select.select2({
            minimumResultsForSearch: Infinity,
        });
    })();
});