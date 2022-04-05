
function hide(id){
        var div = document.getElementById(id);
        div.classList.add("hide");
}

function hideUnhide(id, id2) {
        var div = document.getElementById(id);
        div.classList.toggle('hide');
        hide(id2);
}


function chooseUploadType(form_num="1"){
        
        var textEntryDiv, docUploadDiv, hardCopyDiv, saveButton, choice, value;
        if (form_num == "2"){
                choice = document.getElementById("method-2");
                textEntryDiv = document.getElementById("text-entry-div-2");
                docUploadDiv = document.getElementById("doc-upload-div-2");
                hardCopyDiv = document.getElementById("hard-copy-div-2");
                saveButton = document.getElementById("save-btn-2");                
        }else{
                choice = document.getElementById("method");
                textEntryDiv = document.getElementById("text-entry-div");
                docUploadDiv = document.getElementById("doc-upload-div");
                hardCopyDiv = document.getElementById("hard-copy-div");
                saveButton = document.getElementById("save-btn");
        }

        value = choice.value;

        switch(value){
                case "1":
                        textEntryDiv.classList.remove("hide");
                        docUploadDiv.classList.add("hide");
                        hardCopyDiv.classList.add("hide");
                        saveButton.classList.remove("hide");
                        break;
                case "2":
                        textEntryDiv.classList.add("hide");
                        docUploadDiv.classList.remove("hide");
                        hardCopyDiv.classList.add("hide");
                        saveButton.classList.add("hide");
                        break;
                case "3":
                        textEntryDiv.classList.add("hide");
                        docUploadDiv.classList.add("hide");
                        hardCopyDiv.classList.remove("hide");
                        saveButton.classList.add("hide");
                        break;
                default:
                        textEntryDiv.classList.add("hide");
                        docUploadDiv.classList.add("hide");
                        hardCopyDiv.classList.add("hide");
                        saveButton.classList.add("hide");
        }

}

function validateEditPasswordForm(){
        
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");

        console.log(password.value, confirmPassword.value);
        if(password.value != confirmPassword.value){
                alert("Error: Password and Confirm Password does not match");     
                return false;  
        }else{
                return true;
        }
}

function generatePassword() {
        var length = 16,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        
        const password = document.getElementById("password");
        password.value = retVal;
}