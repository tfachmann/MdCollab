var js = import("../pkg/md_collab.js");

var md = document.getElementById("md_input");
md.addEventListener("keyup", render_html);

var css_selection = document.getElementById("output_css_selection");
//css_selection.onchange(console.log(css_selection.value));
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

    //remove old link
    document.getElementById("output_css").setAttribute("href", new_css_link)
}

render_html();
