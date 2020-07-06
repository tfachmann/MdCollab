var js = import("../pkg/md_collab.js");

var md = document.getElementById("md_input");
md.addEventListener("keyup", render_html);

var save = document.getElementById("btn_save");
save.addEventListener("click", function(){save_contents(get_contents(), get_file_name());});

function render_html() {
    let md_text = md.value;
    js.then(js => {
        res = js.render(md_text);
        document.getElementById("html_output").innerHTML = res
    });
}


function get_contents() {
    //...
    return md.value;
}


function get_file_name() {
    //....
    return 'test.md';
}


function save_contents(contents, filename) {
    var file = new Blob([contents], {type: 'text/plain'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

