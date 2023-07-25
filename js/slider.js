var left_side = 0
var right_side = 100

function set_deaths_data_array(){
    let left_index = Math.floor((left_side/100)*orig_deaths_data_for_plot.length)
    let right_index = Math.floor((right_side/100)*orig_deaths_data_for_plot.length)

    working_deaths_data_for_plot = orig_deaths_data_for_plot.slice(left_index, right_index)

    left_index = Math.floor((left_side/100)*orig_fatality_data.length)
    right_index = Math.floor((right_side/100)*orig_fatality_data.length)
    working_fatality_data = orig_fatality_data.slice(left_index, right_index)
}

addEventListener('input', e => {
    let _t = e.target;
    _t.parentNode.style.setProperty(`--${_t.id}`, +_t.value);
    
    a = _t.parentNode.style.getPropertyValue("--a");
    b = _t.parentNode.style.getPropertyValue("--b");

    left_side = Math.min(a, b);
    right_side = Math.max(a, b);
    if (left_side == right_side) {
        set_deaths_data_array();
        return
    }
    set_deaths_data_array();
    draw_or_refresh();
  }, false);