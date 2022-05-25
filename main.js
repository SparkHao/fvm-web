
let common_actorId = ""
let actorCodeCid = ""

function click_compile() {
    let params = {
        "lib.rs": "111"
    }
    $("#compile_fn").attr('disabled',true);
    console.log("click_compile", "params", params)
    $("#compile_result").html('远程服务编译...');
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("success, data: ", data);
            console.log("logs: ", data.logs)
            $("#compile_result").html("远程服务编译完成")
            $("#result_textarea").html(data.logs);
            $("#compile_fn").attr('disabled',false);
        },error:function (data) {
            alert(data);
            $("#compile_fn").attr('disabled',false);
        }
    })
}

function click_install() {
    $("#install_fn").attr('disabled',true);
    let params = {"action": 1};
    console.log("click_install", "params", params)
    $("#install_result").html('远程服务安装actor...');
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("success, data: ", data.success, data.logs);
            $("#install_result").html("远程服务安装完成")
            $("#install_textarea").html(data.logs);
            let arrs = data.logs.split("\n");
            console.log("-----", arrs[3])
            let actorCid = arrs[3].split(": ")
            actorCodeCid = actorCid[1].trim()
            $("#install_fn").attr('disabled',false);
        },error:function (data) {
            alert(data.message);
            $("#install_fn").attr('disabled',false);
        }
    })
}

function click_create() {
    $("#create_fn").attr('disabled',true);
    let params = {"action": 2, "cid": actorCodeCid};
    console.log("click_create", "params", params)
    $("#create_result").html('远程服务新建actor...');
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("success, data: ", data);
            console.log("logs: ", data.logs)
            $("#create_result").html("远程服务新建actor完成")
            $("#create_textarea").html(data.logs);
            let arrs = data.logs.split("\n");
            console.log("-----", arrs[3])
            let actorIdArr = arrs[3].split(": ")
            common_actorId = actorIdArr[1].trim()
            $("#create_fn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#create_result").html("远程服务新建actor失败")
            $("#create_textarea").html(req.responseText);
            $("#create_fn").attr('disabled',false);

        }
    })
}

function set_actor_id() {
    common_actorId = $("#actorId_v").val()
    console.log("SET common_actorId: ", common_actorId)
}

function click_get_actor_code_cid() {
    console.log("click_get_actor_code_cid")
    $("#get_actor_code_cid_id").attr('disabled',true);
    let actorId_balance = $("#actorId_balance").val()
    let actorId_base64 = Base64.encode(actorId_balance);
    console.log("common_actorId", common_actorId, "base64", actorId_base64)
    let params = {
                    "action": 3,
                    "actorId": common_actorId,
                    "method": 6,
                    "params": actorId_base64,
                }

    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("success, data: ", data);
            console.log("logs: ", data.logs)
            $("#create_result").html("正在请求远程服务...")
            $("#create_textarea").html(data.logs);
            let arrs = data.logs.split("\n");
            console.log("-----", arrs[3])
            $("#get_actor_code_cid_id").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#create_result").html("请求远程服务失败...")
            $("#create_textarea").html(req.responseText);
            $("#get_actor_code_cid_id").attr('disabled',false);
        }
    })
}

function new_actor_address() {
    $("#new_actor_address").attr('disabled',true);
    console.log("[new_actor_address]", "actorId", common_actorId)
    if (common_actorId == "") {
        alert("actorId not set!!!")
    }

    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 8,
        "params": "",
    }
    console.log("[new_actor_address] params: ", params)
    $("#request_new_actor_address").html("正在请求远程服务...")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("success, data: ", data);
            console.log("logs: ", data.logs)
            $("#request_new_actor_address").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("address: ", arrs[3])
            $("#new_actor_address_result").html(arrs[3])
            $("#new_actor_address").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#request_new_actor_address").html("请求远程服务失败...")
            $("#new_actor_address_result").html(req.responseText);
            $("#new_actor_address").attr('disabled',false);
        }
    })
}

function get_code_cid_for_type() {
    $("#get_code_cid_for_type_btn").attr('disabled',true);
    console.log("[get_code_cid_for_type]", "actorId", common_actorId)
    if (common_actorId == "") {
        alert("actorId not set!!!")
    }

    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 10,
        "params": Base64.encode(1),
    }
    console.log("[get_code_cid_for_type] params: ", params)
    $("#get_code_cid_for_type_div").html("正在请求远程服务...")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            // console.log("success, data: ", data);
            console.log("logs: ", data.logs)
            $("#get_code_cid_for_type_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("address: ", arrs[3])
            $("#get_code_cid_for_type_result").html(arrs[3])
            $("#get_code_cid_for_type_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#get_code_cid_for_type_div").html("请求远程服务失败...")
            $("#get_code_cid_for_type_result").html(req.responseText);
            $("#get_code_cid_for_type_btn").attr('disabled',false);
        }
    })
}

function create_actor_address() {
    $("#create_actor_address_btn").attr('disabled',true);
    console.log("[create_actor_address]", "actorId", common_actorId)
    if (common_actorId == "") {
        alert("actorId not set!!!")
    }

    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 9,
        "params": "",
    }
    console.log("[create_actor_address] params: ", params)
    $("#create_actor_address_div").html("正在请求远程服务...")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            // console.log("success, data: ", data);
            console.log("logs: ", data.logs)
            $("#create_actor_address_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("address: ", arrs[3])
            $("#create_actor_address_result").html(arrs[3])
            $("#create_actor_address_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#create_actor_address_div").html("请求远程服务失败...")
            $("#create_actor_address_result").html(req.responseText);
            $("#create_actor_address_btn").attr('disabled',false);
        }
    })
}

function resolve_builtin_actor_type() {
    $("#resolve_builtin_actor_type_btn").attr('disabled',false);
    console.log("[resolve_builtin_actor_type]", "actorId", common_actorId)
    if (common_actorId == "") {
        alert("actorId not set!!!")
    }

    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 13,
        "params": "",
    }
    console.log("[resolve_builtin_actor_type] params: ", params)
    $("#create_actor_address_div").html("正在请求远程服务...")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            // console.log("success, data: ", data);
            console.log("logs: ", data.logs)
            $("#resolve_builtin_actor_type_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("address: ", arrs[3])
            $("#create_actor_address_result").html(arrs[3])
            $("#resolve_builtin_actor_type_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#create_actor_address_div").html("请求远程服务失败...")
            $("#create_actor_address_result").html(req.responseText);
            $("#resolve_builtin_actor_type_btn").attr('disabled',false);
        }
    })
}

function resolve_address() {
    $("#resolve_address_btn").attr('disabled',false);
    console.log("[resolve_address]", "actorId", common_actorId)
    if (common_actorId == "") {
        alert("actorId not set!!!")
    }

    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 12,
        "params": "",
    }
    console.log("[resolve_address] params: ", params)
    $("#resolve_address_div").html("正在请求远程服务...")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            // console.log("success, data: ", data);
            console.log("logs: ", data.logs)
            $("#resolve_address_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("address: ", arrs[3])
            $("#resolve_address_result").html(arrs[3])
            $("#resolve_address_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#resolve_address_div").html("请求远程服务失败...")
            $("#resolve_address_result").html(req.responseText);
            $("#resolve_address_btn").attr('disabled',false);
        }
    })
}

function base64_test() {
    let input_value = $("#base64_input").val()
    let result = Base64.encode(input_value)
    $("#base64_result").html(result)
}