
let common_actorId = ""
let actorCodeCid = ""

function click_compile() {
    let params = {
        "lib.rs": "111"
    }
    $("#compile_fn").attr('disabled',true);
    let id = "compile_timer_div";
    console.log("click_compile", "params", params, id)
    startTimer();
    $("#compile_result").html('远程服务编译...');
    $("#result_textarea").html("");
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
            stopTimer();
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#compile_result").html("远程服务编译失败")
            $("#result_textarea").html(err);
            $("#compile_fn").attr('disabled',false);
            stopTimer();
        }
    });

}

function click_install() {
    $("#install_fn").attr('disabled',true);
    let params = {"action": 1};
    console.log("click_install", "params", params)
    // startTimer();
    $("#install_result").html('远程服务安装actor...');
    $("#install_textarea").html("");
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
            // stopTimer();
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#install_result").html("远程服务安装失败")
            $("#result_textarea").html(err);
            $("#install_fn").attr('disabled',false);
            // stopTimer();
        }
    })
}

function click_create() {
    $("#create_fn").attr('disabled',true);
    let params = {"action": 2, "cid": actorCodeCid};
    console.log("click_create", "params", params)
    // startTimer();
    $("#create_actor_result").html('远程服务新建actor...');
    $("#create_textarea").html("");
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("success, data: ", data);
            console.log("logs: ", data.logs)
            $("#create_actor_result").html("远程服务新建actor完成")
            $("#create_textarea").html(data.logs);
            let arrs = data.logs.split("\n");
            console.log("-----", arrs[3])
            let actorIdArr = arrs[3].split(": ")
            common_actorId = actorIdArr[1].trim()
            $("#create_fn").attr('disabled',false);
            // stopTimer();
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#create_actor_result").html("远程服务新建actor失败")
            $("#create_textarea").html(req.responseText);
            $("#create_fn").attr('disabled',false);
            // stopTimer();

        }
    })
}

function set_actor_id() {
    common_actorId = $("#actorId_v").val()
    console.log("SET common_actorId: ", common_actorId)
}

function click_get_actor_code_cid() {
    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    // startTimer();
    $("#get_actor_code_cid_div").html("正在请求远程服务...")
    $("#get_actor_code_cid_result").html("");
    $("#get_actor_code_cid_id").attr('disabled',true);
    let actorId_balance = $("#get_actor_code_cid_input").val()
    let actorId_base64 = Base64.encode(actorId_balance);
    console.log("common_actorId", common_actorId, "base64", actorId_base64)
    let params = {
                    "action": 3,
                    "actorId": common_actorId,
                    "method": 11,
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
            $("#get_actor_code_cid_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            $("#get_actor_code_cid_result").html(arrs[3]);
            $("#get_actor_code_cid_id").attr('disabled',false);
            // stopTimer();
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#get_actor_code_cid_result").html("请求远程服务失败...")
            $("#get_actor_code_cid_result").html(req.responseText);
            $("#get_actor_code_cid_id").attr('disabled',false);
            // stopTimer();
        }
    })
}

function new_actor_address() {
    console.log("[new_actor_address]", "actorId", common_actorId)
    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#new_actor_address").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 13,
        "params": "",
    }
    console.log("[request] params: ", params)
    // startTimer();
    $("#request_new_actor_address").html("正在请求远程服务...")
    $("#new_actor_address_result").html("")
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
            // stopTimer();
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#request_new_actor_address").html("请求远程服务失败...")
            $("#new_actor_address_result").html(req.responseText);
            $("#new_actor_address").attr('disabled',false);
            // stopTimer();
        }
    })
}

function get_code_cid_for_type() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#get_code_cid_for_type_btn").attr('disabled',true);
    let actor_type = $("#actor_type").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 12,
        "params": Base64.encode(actor_type),
    }
    console.log("[request] params: ", params)
    $("#get_code_cid_for_type_div").html("正在请求远程服务...")
    $("#get_code_cid_for_type_result").html("")
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
            console.log("cid: ", arrs[3])
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

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#create_actor_address_btn").attr('disabled',true);
    let actorId = $("#create_actor_actorId_input").val();
    let cid = $("#create_actor_cid_input").val();
    let actorId_cid = actorId +"," + cid;
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 14,
        "params": Base64.encode(actorId_cid),
    }
    console.log("[request] params: ", params)
    $("#create_actor_address_div").html("正在请求远程服务...")
    $("#create_actor_address_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#create_actor_address_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            $("#create_actor_address_result").html(arrs[arrs.length - 1])
            $("#create_actor_address_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            $("#create_actor_address_div").html("请求远程服务失败...")
            $("#create_actor_address_result").html(req.responseText);
            $("#create_actor_address_btn").attr('disabled',false);
        }
    })
}

function resolve_builtin_actor_type() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#resolve_builtin_actor_type_btn").attr('disabled',true);
    let cid = $("#resolve_builtin_actor_type_input").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 15,
        "params": Base64.encode(cid),
    }
    console.log("[request] params: ", params)
    $("#resolve_builtin_actor_type_div").html("正在请求远程服务...")
    $("#resolve_builtin_actor_type_result").html("")
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
            console.log("response: ", arrs[3])
            $("#resolve_builtin_actor_type_result").html(arrs[3])
            $("#resolve_builtin_actor_type_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#resolve_builtin_actor_type_div").html("请求远程服务失败...")
            $("#resolve_builtin_actor_type_result").html(req.responseText);
            $("#resolve_builtin_actor_type_btn").attr('disabled',false);
        }
    })
}

function resolve_address() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#resolve_address_btn").attr('disabled',true);
    let addr = $("#resolve_address_input").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 16,
        "params": Base64.encode(addr),
    }
    console.log("[request] params: ", params)
    $("#resolve_address_div").html("正在请求远程服务...")
    $("#resolve_address_result").html("")
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
            console.log("response: ", arrs[3])
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


function hash_blake2b() {
    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#hash_blake2b_btn").attr('disabled',true);
    let data = $("#hash_blake2b_input").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 22,
        "params": Base64.encode(data),
    }
    console.log("[request] params: ", params)
    $("#hash_blake2b_div").html("正在请求远程服务...")
    $("#hash_blake2b_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            // console.log("success, data: ", data);
            console.log("logs: ", data.logs)
            $("#hash_blake2b_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#hash_blake2b_result").html(arrs[3])
            $("#hash_blake2b_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#hash_blake2b_div").html("请求远程服务失败...")
            $("#hash_blake2b_result").html(req.responseText);
            $("#hash_blake2b_btn").attr('disabled',false);
        }
    })
}

function click_log() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#log_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 31,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#log_div").html("正在请求远程服务...")
    $("#log_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            // console.log("success, data: ", data);
            console.log("logs: ", data.logs)
            $("#log_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#log_result").html(arrs[3])
            $("#log_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#log_div").html("请求远程服务失败...")
            $("#log_result").html(req.responseText);
            $("#log_btn").attr('disabled',false);
        }
    })
}

function click_enabled() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#enabled_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 32,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#enabled_div").html("正在请求远程服务...")
    $("#enabled_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#enabled_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#enabled_result").html(arrs[3])
            $("#enabled_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#enabled_div").html("请求远程服务失败...")
            $("#enabled_result").html(req.responseText);
            $("#enabled_btn").attr('disabled',false);
        }
    })
}

function click_gas() {
    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#gas_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 41,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#gas_div").html("正在请求远程服务...")
    $("#gas_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#gas_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#gas_result").html(arrs[3])
            $("#gas_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#gas_div").html("请求远程服务失败...")
            $("#gas_result").html(req.responseText);
            $("#gas_btn").attr('disabled',false);
        }
    })
}

function click_open() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#open_btn").attr('disabled',true);
    let input = $("#open_input").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 51,
        "params": Base64.encode(input),
    }
    console.log("[request] params: ", params)
    $("#open_div").html("正在请求远程服务...")
    $("#open_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#open_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#open_result").html(arrs[3])
            $("#open_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#open_div").html("请求远程服务失败...")
            $("#open_result").html(req.responseText);
            $("#open_btn").attr('disabled',false);
        }
    })
}

function click_ipld_create() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#ipld_create_btn").attr('disabled',true);
    let input = $("#ipld_create_input").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 52,
        "params": Base64.encode(input),
    }
    console.log("[request] params: ", params)
    $("#ipld_create_div").html("正在请求远程服务...")
    $("#ipld_create_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#ipld_create_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#ipld_create_result").html(arrs[3])
            $("#ipld_create_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#ipld_create_div").html("请求远程服务失败...")
            $("#ipld_create_result").html(req.responseText);
            $("#ipld_create_btn").attr('disabled',false);
        }
    })
}

function click_cid() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#cid_btn").attr('disabled',true);
    let input = $("#cid_input").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 53,
        "params": Base64.encode(input),
    }
    console.log("[request] params: ", params)
    $("#cid_div").html("正在请求远程服务...")
    $("#cid_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#cid_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#cid_result").html(arrs[3])
            $("#cid_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#cid_div").html("请求远程服务失败...")
            $("#cid_result").html(req.responseText);
            $("#cid_btn").attr('disabled',false);
        }
    })
}

function click_read() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#read_btn").attr('disabled',true);
    let input = $("#read_input").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 54,
        "params": Base64.encode(input),
    }
    console.log("[request] params: ", params)
    $("#read_div").html("正在请求远程服务...")
    $("#read_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#read_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#read_result").html(arrs[3])
            $("#read_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#read_div").html("请求远程服务失败...")
            $("#read_result").html(req.responseText);
            $("#read_btn").attr('disabled',false);
        }
    })
}

function click_stat() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#stat_btn").attr('disabled',true);
    let input = $("#stat_input").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 55,
        "params": Base64.encode(input),
    }
    console.log("[request] params: ", params)
    $("#stat_div").html("正在请求远程服务...")
    $("#stat_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#stat_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#stat_result").html(arrs[3])
            $("#stat_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#stat_div").html("请求远程服务失败...")
            $("#stat_result").html(req.responseText);
            $("#stat_btn").attr('disabled',false);
        }
    })
}

function click_caller() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#caller_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 61,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#caller_div").html("正在请求远程服务...")
    $("#caller_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#caller_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#caller_result").html(arrs[3])
            $("#caller_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#caller_div").html("请求远程服务失败...")
            $("#caller_result").html(req.responseText);
            $("#caller_btn").attr('disabled',false);
        }
    })
}

function click_receiver() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#receiver_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 62,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#receiver_div").html("正在请求远程服务...")
    $("#receiver_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#receiver_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#receiver_result").html(arrs[3])
            $("#receiver_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#receiver_div").html("请求远程服务失败...")
            $("#receiver_result").html(req.responseText);
            $("#receiver_btn").attr('disabled',false);
        }
    })
}

function method_number() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#method_number_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 63,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#method_number_div").html("正在请求远程服务...")
    $("#method_number_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#method_number_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#method_number_result").html(arrs[3])
            $("#method_number_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#method_number_div").html("请求远程服务失败...")
            $("#method_number_result").html(req.responseText);
            $("#method_number_btn").attr('disabled',false);
        }
    })
}

function value_received() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#value_received_btn").attr('disabled',true);
    let amt = $("#value_input").val();
    let params = {
        "action": 5,
        "actorId": common_actorId,
        "method": 64,
        "params": Base64.encode(2),
        "value": amt,
    }
    console.log("[request] params: ", params)
    $("#value_received_div").html("正在请求远程服务...")
    $("#value_received_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#value_received_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#value_received_result").html(arrs[3])
            $("#value_received_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#value_received_div").html("请求远程服务失败...")
            $("#value_received_result").html(req.responseText);
            $("#value_received_btn").attr('disabled',false);
        }
    })
}

function curr_epoch() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#curr_epoch_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 71,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#curr_epoch_div").html("正在请求远程服务...")
    $("#curr_epoch_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#curr_epoch_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#curr_epoch_result").html(arrs[3])
            $("#curr_epoch_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#curr_epoch_div").html("请求远程服务失败...")
            $("#curr_epoch_result").html(req.responseText);
            $("#curr_epoch_btn").attr('disabled',false);
        }
    })
}

function click_version() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#version_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 72,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#version_div").html("正在请求远程服务...")
    $("#version_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#version_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#version_result").html(arrs[3])
            $("#version_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#version_div").html("请求远程服务失败...")
            $("#version_result").html(req.responseText);
            $("#version_btn").attr('disabled',false);
        }
    })
}

function base_fee() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#base_fee_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 73,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#base_fee_div").html("正在请求远程服务...")
    $("#base_fee_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#base_fee_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#base_fee_result").html(arrs[3])
            $("#base_fee_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#base_fee_div").html("请求远程服务失败...")
            $("#base_fee_result").html(req.responseText);
            $("#base_fee_btn").attr('disabled',false);
        }
    })
}

function total_fil_circ_supply() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#total_fil_circ_supply_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 74,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#total_fil_circ_supply_div").html("正在请求远程服务...")
    $("#total_fil_circ_supply_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#total_fil_circ_supply_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#total_fil_circ_supply_result").html(arrs[3])
            $("#total_fil_circ_supply_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#total_fil_circ_supply_div").html("请求远程服务失败...")
            $("#total_fil_circ_supply_result").html(req.responseText);
            $("#total_fil_circ_supply_btn").attr('disabled',false);
        }
    })
}


function get_chain_randomness() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#get_chain_randomness_btn").attr('disabled',true);
    let domain_tag = $("#domain_tag").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 81,
        "params": Base64.encode(domain_tag),
    }
    console.log("[request] params: ", params)
    $("#get_chain_randomness_div").html("正在请求远程服务...")
    $("#get_chain_randomness_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#get_chain_randomness_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#get_chain_randomness_result").html(arrs[3])
            $("#get_chain_randomness_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#get_chain_randomness_div").html("请求远程服务失败...")
            $("#get_chain_randomness_result").html(req.responseText);
            $("#get_chain_randomness_btn").attr('disabled',false);
        }
    })
}

function get_beacon_randomness() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#get_beacon_randomness_btn").attr('disabled',true);
    let domain_tag = $("#domain_tag2").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 82,
        "params": Base64.encode(domain_tag),
    }
    console.log("[request] params: ", params)
    $("#get_beacon_randomness_div").html("正在请求远程服务...")
    $("#get_beacon_randomness_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#get_beacon_randomness_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#get_beacon_randomness_result").html(arrs[3])
            $("#get_beacon_randomness_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#get_beacon_randomness_div").html("请求远程服务失败...")
            $("#get_beacon_randomness_result").html(req.responseText);
            $("#get_beacon_randomness_btn").attr('disabled',false);
        }
    })
}

function click_send() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#send_btn").attr('disabled',true);
    let actorId = $("#send_actor_input").val();
    let method = $("#send_method_input").val();
    let amount = $("#send_amount_input").val();
    let request = actorId +","+method+","+(amount*1000000000000000000);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 91,
        "params": Base64.encode(request),
    }
    console.log("[request] params: ", params)
    $("#send_div").html("正在请求远程服务...")
    $("#send_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#send_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#send_result").html(arrs[3])
            $("#send_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#send_div").html("请求远程服务失败...")
            $("#send_result").html(req.responseText);
            $("#send_btn").attr('disabled',false);
        }
    })
}

function click_root() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#root_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 101,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#root_div").html("正在请求远程服务...")
    $("#root_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#root_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#root_result").html(arrs[3])
            $("#root_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#root_div").html("请求远程服务失败...")
            $("#root_result").html(req.responseText);
            $("#root_btn").attr('disabled',false);
        }
    })
}

function click_set_root() {

    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#set_root_btn").attr('disabled',true);
    let cid = $("#set_root_input").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 102,
        "params": Base64.encode(cid),
    }
    console.log("[request] params: ", params)
    $("#set_root_div").html("正在请求远程服务...")
    $("#set_root_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#set_root_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#set_root_result").html(arrs[3])
            $("#set_root_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#set_root_div").html("请求远程服务失败...")
            $("#set_root_result").html(req.responseText);
            $("#set_root_btn").attr('disabled',false);
        }
    })
}

function transfer() {
    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#transfer_btn").attr('disabled',true);
    let amt = $("#transfer_amt").val();
    let params = {
        "action": 4,
        "actorId": common_actorId,
        "method": "",
        "params": amt,
    }
    console.log("[request] params: ", params)
    $("#current_balance_div").html("正在请求远程服务...")
    $("#current_balance_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#current_balance_div").html("请求远程服务成功...")
            $("#current_balance_result").html(data.logs)
            $("#transfer_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#current_balance_div").html("请求远程服务失败...")
            $("#current_balance_result").html(req.responseText);
            $("#transfer_btn").attr('disabled',false);
        }
    })
}

function current_balance() {
    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#current_balance_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 103,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#current_balance_div").html("正在请求远程服务...")
    $("#current_balance_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#current_balance_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#current_balance_result").html(arrs[3])
            $("#current_balance_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#current_balance_div").html("请求远程服务失败...")
            $("#current_balance_result").html(req.responseText);
            $("#current_balance_btn").attr('disabled',false);
        }
    })
}

function self_destruct() {
    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#self_destruct_btn").attr('disabled',true);
    let addr = $("#self_destruct_input").val();
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 104,
        "params": Base64.encode(addr),
    }
    console.log("[request] params: ", params)
    $("#self_destruct_div").html("正在请求远程服务...")
    $("#self_destruct_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#self_destruct_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#self_destruct_result").html(arrs[3])
            $("#self_destruct_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#self_destruct_div").html("请求远程服务失败...")
            $("#self_destruct_result").html(req.responseText);
            $("#self_destruct_btn").attr('disabled',false);
        }
    })
}

function click_abort() {
    if (common_actorId == "") {
        alert("actorId not set!!!")
        return
    }
    $("#abort_btn").attr('disabled',true);
    let params = {
        "action": 3,
        "actorId": common_actorId,
        "method": 111,
        "params": "",
    }
    console.log("[request] params: ", params)
    $("#abort_div").html("正在请求远程服务...")
    $("#abort_result").html("")
    $.ajax({
        url:"http://127.0.0.1:3000/compile",
        contentType:"application/json",
        data:JSON.stringify(params),
        type:"POST",
        success:function (data) {
            console.log("logs: ", data.logs)
            $("#abort_div").html("请求远程服务成功...")
            let arrs = data.logs.split("\n");
            console.log("result: ", arrs[3])
            $("#abort_result").html(arrs[3])
            $("#abort_btn").attr('disabled',false);
        },error:function (req) {
            let err = req.responseText;
            console.log(err);
            $("#abort_div").html("请求远程服务失败...")
            $("#abort_result").html(req.responseText);
            $("#abort_btn").attr('disabled',false);
        }
    })
}

function base64_encode() {
    let input_value = $("#base64_encode_input").val()
    let result = Base64.encode(input_value)
    $("#base64_encode_result").html(result)
}

function base64_decode() {
    let input_value = $("#base64_decode_input").val()
    let result = Base64.decode(input_value)
    $("#base64_decode_result").html(result)
}

var second;//时 分 秒
second=0;//初始化
var clock;//计时器
function resetTimer()//重置
{
    clearInterval(clock);
    second=0;
    // document.getElementById('timeValue').value=second+'秒';
}

function startTimer()//开始
{
    console.log("start timer");
    clock=setInterval(timer,1000);

}

function stopTimer(time_id) {
    //停止计时
    second=0
    clearInterval(clock);
}
//计时函数
function timer() {
    second++;
    console.log("timer", second);
    let data = second+'s'
    $("#compile_timer_div").html(data);
    // document.getElementById(time_id).textContent = data;
}