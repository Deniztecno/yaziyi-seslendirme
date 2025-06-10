const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speachBtn = document.querySelector("button");

//! tarayıcı tarafından saplanan speechSynthesis api
let synth = speechSynthesis; 
let isSpeaking = true; //! konuşma durumunu takip eden değişken

// !Tarayıcının mevcut ses seçeneklerini  alıp, select'e ekleyen fonksiyon
function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : ""; //? başlangıçta ingilizce seçili olsun
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend",option);
    }
}
//! ses seçeneklerini listeler
synth.addEventListener("voiceschanged", voices);

//! metnin sesli okuyan fonksiyon
function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);

    for(let voice of synth.getVoices()){
        if (voice.name === voiceList.value) {
            utterance.voice = voice; // selectden seçilen ses ile okur
        }
    }

    utterance.addEventListener("end", () => {
        isSpeaking = false;
        document.querySelector(".placeholder").style.display = "none";
    });

    synth.speak(utterance);
    isSpeaking = true;
}

speachBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(textarea.value !== ""){
        if (!synth.speaking) {
            textToSpeech(textarea.value);
            document.querySelector(".placeholder").style.display = "block";
        }
    }
})


window.addEventListener("DOMContentLoaded", () => {
    voices();
})