var FileSaver = require('file-saver');

var js = import("../pkg/md_collab.js");

var md = document.getElementById("md_input");
md.addEventListener("keyup", render_html);

var save = document.getElementById("btn_save");
save.addEventListener("click", function(){save_contents(get_md_contents(), get_file_name());});

function render_html() {
    let md_text = md.value;
    js.then(js => {
        res = js.render(md_text);
        document.getElementById("html_output").innerHTML = res
    });
}


function get_md_contents() {
    //...
    return md.value;
}


function get_file_name() {
    //....
    return 'test.md';
}


function save_contents(contents, filename) {
    let file = new Blob([contents], {type: 'text/plain'});
    if (window.navigator.msSaveOrOpenBlob) { // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
        FileSaver.saveAs(file, filename);
    }
}

