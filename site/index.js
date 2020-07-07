var js = import("../pkg/md_collab.js");

window.addEventListener("load", render_html);

var md = document.getElementById("md_input");
md.addEventListener("keyup", render_html);
md.addEventListener("keydown", print_tab(event), false);

var css_selection = document.getElementById("output_css_selection");
css_selection.addEventListener('change', specify_output_css);

function render_html() {
    let md_text = md.value;
    js.then(js => {
        res = js.render(md_text);
        document.getElementById("html_output").innerHTML = res
    });
}

function specify_output_css() {
    let new_css_link = "output-styles/" + css_selection.value
    //change css file
    document.getElementById("output_css").setAttribute("href", new_css_link)
}

function print_tab(e) {
  var keyCode = e.keyCode || e.which;
  Window.alert(e);
  if (keyCode == 9) {
    e.preventDefault();
    var start = $(this).get(0).selectionStart;
    var end = $(this).get(0).selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

    // put caret at right position again
    $(this).get(0).selectionStart =
    $(this).get(0).selectionEnd = start + 1;
  }
}
