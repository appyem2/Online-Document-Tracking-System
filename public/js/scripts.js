function hideUnhide(id) {
        var div = document.getElementById(id);
        div.classList.toggle('hide');
}

function chooseUploadType(){
        var choice = document.getElementById("method");
        var value = choice.value;
        var textEntryDiv = document.getElementById("text-entry-div");
        var docUploadDiv = document.getElementById("doc-upload-div");
        var hardCopyDiv = document.getElementById("hard-copy-div");

        switch(value){
                case "1":
                        textEntryDiv.classList.remove("hide");
                        docUploadDiv.classList.add("hide");
                        hardCopyDiv.classList.add("hide");
                        break;
                case "2":
                        textEntryDiv.classList.add("hide");
                        docUploadDiv.classList.remove("hide");
                        hardCopyDiv.classList.add("hide");
                        break;
                case "3":
                        textEntryDiv.classList.add("hide");
                        docUploadDiv.classList.add("hide");
                        hardCopyDiv.classList.remove("hide");
                        break;
                default:
                        textEntryDiv.classList.add("hide");
                        docUploadDiv.classList.add("hide");
                        hardCopyDiv.classList.add("hide");
        }

}
