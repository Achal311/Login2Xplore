var baseUrl = "http://api.login2explore.com:5577";
var imlPartUrl = "/api/iml";
var irlPartUrl = "/api/irl";
var islPartUrl = "/api/isl";
var token = "90932656|-31949276304402486|90948832";
var dataBaseName = "STUDENT-DB";
var relationName = "STD-TABLE";

$("#stdrno").focus();

function saveRecNo(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}
//reset data
function resetForm() {
    $("#stdrno").val("");
    $("#stdName").val("");
    $("#address").val("");
    $("#bDate").val("");
    $("#eDate").val("");
    $("#stdrno").prop("disable", false);
    document.getElementById("save").disabled = true;
    document.getElementById("update").disabled = true;
    document.getElementById("formReset").disabled = true;
    $("#stdrno").focus();
}

function getrnAsjson() {
    var rn = $("#stdrno").val();
    var jsonStr = {
        Student_RollNumber: rn
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj) {
    saveRecNo(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#stdName").val(data.Student_Name);
    $("#address").val(data.Address);
    $("#bDate").val(data.Birth_Date);
    $("#eDate").val(data.Enrollment_Date);
}

//validate
function validateAndGetFormData() {
    var stdrnoVar = $("#stdrno").val();
    if (stdrnoVar === "") {
        alert("Student roll No Required Value");
        $("#stdrno").focus();
        return "";
    }
    var stdNameVar = $("#stdName").val();
    if (stdNameVar === "") {
        alert("Student Name is Required Value");
        $("#stdName").focus();
        return "";
    }
    var addressVar = $("#address").val();
    if (addressVar === "") {
        alert("Student Address is Required Value");
        $("#address").focus();
        return "";
    }
    var bDateVar = $("#bDate").val();
    if (bDateVar === "") {
        alert("Student Date is Required Value");
        $("#bDate").focus();
        return "";
    }
    var eDateVar = $("#eDate").val();
    if (eDateVar === "") {
        alert("Enrollment Date is Required Value");
        $("#eDate").focus();
        return "";
    }
    var jsonStrObj = {
        Student_RollNumber: stdrnoVar,
        Student_Name: stdNameVar,
        Address: addressVar,
        Birth_Date: bDateVar,
        Enrollment_Date: eDateVar
    };
    return JSON.stringify(jsonStrObj);
}

//save data
function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return "";
    }
    var putReqStr = createPUTRequest(token, jsonStr, dataBaseName, relationName);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, baseUrl, imlPartUrl);
    jQuery.ajaxSetup({async: true});
    alert(JSON.stringify(resultObj));
    resetForm();
}
//Update data
function changeData() {
    $("#update").prop('disable', true);
    jsonChg = validateAndGetFormData();
    var updateReq = createUPDATERecordRequest(token, jsonChg, dataBaseName, relationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateReq, baseUrl, imlPartUrl);
    jQuery.ajaxSetup({async: true});
    console.log(resultObj);
    resetForm();
}

//empId
function getroll() {
    var jsonObjStr = getrnAsjson();
    var getReq = createGET_BY_KEYRequest(token, dataBaseName, relationName, jsonObjStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReq, baseUrl, irlPartUrl);
    jQuery.ajaxSetup({async: true});
    if (resultObj.status === 400) {
        document.getElementById("save").disabled = false;
        document.getElementById("formReset").disabled = false;
        $("#stdName").focus();
    } else if (resultObj.status === 200) {
        document.getElementById("stdrno").disabled = false;
        
        fillData(resultObj);
        document.getElementById("update").disabled = false;
        document.getElementById("formReset").disabled = false;
        
        
        $("#stdName").focus();
    }
}










