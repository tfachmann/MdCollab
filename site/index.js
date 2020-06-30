var js = import("../pkg/md_collab.js");

var md = document.getElementById("md_input");
md.addEventListener("keyup", render_html);

function render_html() {
    let md_text = md.value;
    js.then(js => {
        res = js.render(md_text);
        document.getElementById("html_output").innerHTML = res
    });
}
