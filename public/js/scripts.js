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
        var saveButton = document.getElementById("save-btn");

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