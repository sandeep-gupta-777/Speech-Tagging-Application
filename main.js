let fileInput = document.getElementById('file');

function checkforblank(){
    if(fileInput.value==""){
        alert('please choose a valid file');
    }
    else{
        submit(blob);
    }
    return false;
    // document.getElementByID('file').style.borderColor="red";
}
// TODO: This needs work. Submit button currently does not do anything.
// Also, page does not get reloaded and therefore the results are not shown.
// The POST request has to be done without AJAX.
rec=null
function startRecording() {
    navigator.mediaDevices.getUserMedia({
        audio: true
    })
        .then(stream => {
            aCtx = new AudioContext();
            streamSource = aCtx.createMediaStreamSource(stream);
            rec = new Recorder(streamSource);
            startRecord.disabled = true;
            stopRecord.disabled = false;
            audio = [];
            recordedAudio.controls = false;
            rec.record();
        })
        .catch(e => console.log(e));


}

function stopRecording() {
    startRecord.disabled = false;
    stopRecord.disabled = true;

    rec.stop()
    rec.exportWAV((blob) => {
        // now we could send this blob with an FormData too
        $("#absolute1").css("display","None")  // $("#audio").css("display:block")
        recordedAudio.src = URL.createObjectURL(blob);

        recordedAudio.controls = true;

        //audioDownload.href = recordedAudio.src;
        //audioDownload.download = 'muthootasr17283.wav';
        //audioDownload.innerHTML = 'Download';
        submit(blob);
    });
    return false;
}

function submit(blob) {

    var fd = new FormData();

    var val_lang = $("#country-select").val();
    //base64data = reader.result;
    //console.log(base64data);
    fd.append('file', blob, 'muthootasr17283.wav');

    $.ajax({
        type: 'POST',
        url: 'https://localhost:7000',       //172.16.250.83:7000 changes done
        data: fd,
        cache: false,
        processData: false,
        contentType:false,
        enctype: 'multipart/form-data',
        headers: { 'lang': val_lang }
    }).done(function(data) {
        $("#trans0").text(data["original_text"]);   // changes
        $("#trans").text(data["asr"]);
        $("#trans1").text(data["tag"]);
        $("#trans2").text(data["processing_time"]);


        $("#transcript").css("display",data["vis"]);

        /* if(data.redirect){
                   window.location.href = data.redirect;
   return false;				}*/

        // var time= stop - start ;
        // console.log(time);
    });
    return false;
}
