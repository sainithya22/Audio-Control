/// <reference path="../node_modules/chrome-extension-async/chrome-extension-async.d.ts" />
import 'chrome-extension-async' //to be able to write async await functions to the extension

<<<<<<< HEAD
//import Message from './interfaces/Message'
import { MDCSlider } from '@material/slider'

'use strict';
=======
import Message from './interfaces/Message'
import { MDCSlider } from '@material/slider'

>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65

var bg = chrome.extension.getBackgroundPage();
var default_no = bg.document.getElementById("default_no");
var sink_no = default_no.value;


//The HTMLDivElement interface provides special properties (beyond the regular HTMLElement 
//interface it also has available to it by inheritance) for manipulating <div> elements.

const sliderElem= document.getElementById('volume-slider')
//document.querySelector returns the first Element within the document that matches the specified selector, or group of selectors.
//This string must be a valid CSS selector string; if it isn't, a SyntaxError exception is thrown. 

const slider = new MDCSlider(sliderElem)

<<<<<<< HEAD
void(async ()=>{
=======
async function init(){
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
  // Hide the slider until we know the initial volume
  sliderElem.style.opacity = '0'

  const initialValue = await getActiveTabVolume()
  slider.value = initialValue * 100

  sliderElem.style.opacity = '1'
  chrome.tabs.query({active: true, currentWindow: true},
		function(tabs) {
      console.log('report_sink_no')
			var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id,
				{"message": "report_sink_no"},
				{'frameId': 0}, // only request from main frame
				function(response) {
					if (response) {
            sink_no = response.sink_no;
					}
					navigator.mediaDevices.enumerateDevices()
						.then(getDevices)
						.catch(handleError);
				}
			);
		}
	)

<<<<<<< HEAD
})();
=======
}
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65

//to make the slider listen to thumb change
slider.listen('MDCSlider:input', () => {
  console.log("slider value :"+ slider.value);
  const value = slider.value / 100
  setActiveTabVolume(value)
})

async function getActiveTabVolume () {
  const tabId = await getActiveTabId()

  //define constant of type Message
  const message = {method: 'get-tab-volume', tabId }

  //Sends a single message to event listeners within the extension
  return chrome.runtime.sendMessage(message)
}

async function setActiveTabVolume (value) {
  const tabId = await getActiveTabId()
  const message= { method: 'set-tab-volume', tabId, value }
  return chrome.runtime.sendMessage(message)
}

async function getActiveTabId () {

  //Gets all tabs that have the specified properties, or all tabs if no properties are specified.
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return activeTab.id
}


/* 
async function getActiveTabVolume () {
  await chrome.tabs.query({active: true, currentWindow: true},
		function(tabs) {
      var activeTab = tabs[0];
      return chrome.tabs.sendMessage(activeTab.id,{ "method": 'get-tab-volume', "tabID": activeTab.id})
})}
  

async function setActiveTabVolume (value) {
  await chrome.tabs.query({active: true, currentWindow: true},
		function(tabs) {
      var activeTab = tabs[0]; 
      return chrome.tabs.sendMessage(activeTab.id,{"method": 'set-tab-volume',"value": value , "tabID": activeTab.id});
})} */
/* 
async function getActiveTabId () {
 
      return activeTab.id;
    } */
/* 
  //Gets all tabs that have the specified properties, or all tabs if no properties are specified.
  var [tabs] = await chrome.tabs.query({ active: true, currentWindow: true })
  var currtab= await tabs[0];
  return currtab.id */




//audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);

function getDevices(deviceInfos) {  
  
  console.log('update_device_popup: ' + deviceInfos.length + ' device(s) total (audio/video input/output)');
	var div = document.getElementById("device_options");
	var select = bg.document.getElementById("device_cache");
	while (div.firstChild) { div.removeChild(div.firstChild); }
	for (var i = 0; i !== deviceInfos.length; ++i) {
		var kind = deviceInfos[i].kind;
		var id = deviceInfos[i].deviceId;
		var text = deviceInfos[i].label;
		//console.log('device: ' + id + ' - ' + text);
		if (kind === 'audiooutput') {
			if (id == "default") {
				text = "System Default Device";
			} else if (id == "communications") {
				text = "System Default Communications Device";
			}
			var option = bg.document.getElementById(id);
			if (!text) {
				if (option && option.value) {
					text = option.value;
				} else {
					text = id;
				}
			}
			if (option) {
				option.value = text;
			} else {
				option = bg.document.createElement("option");
				option.id = id;
				option.value = text;
				select.appendChild(option);				
			}
			var input = document.createElement("input");
			input.type= "radio";
			input.name = "device";
			input.id = id;
			input.value = i;
			input.onchange = function(e){output_onchange(e);};
			var textNode = document.createTextNode(text);
			var label = document.createElement("label");
			if (i == sink_no) {
				console.log('current default_no: ' + i + ' - ' + id + ' - ' + text);
				input.checked = true;
			}			
			label.appendChild(textNode);
			label.appendChild(input);
			div.appendChild(label);
		}
	
  }}  // Clone the master outputSelector and replace outputSelector placeholders.
  //const allOutputSelectors = document.querySelectorAll('select');
  /* for (let selector = 0; selector < audioInputSelect.length; selector++) {
    const newInputSelector = audioInputSelect.cloneNode(true);
    newInputSelector.addEventListener('change', start);
    audioInputSelect[selector].parentNode.replaceChild(newInputSelector,
    audioInputSelect[selector]);
  }

  for (let selector = 0; selector < audioOutputSelect.length; selector++) {
    const newOutputSelector = audioOutputSelect.cloneNode(true);
    newOutputSelector.addEventListener('change', start);
    audioOutputSelect[selector].parentNode.replaceChild(newOutputSelector,
    audioOutputSelect[selector]);
  }
 *//* 
  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  }); */


//navigator.mediaDevices.enumerateDevices().then(getDevices).catch(handleError);

/* // Attach audio output device to the provided media element using the deviceId.
async function attachSinkId(element, sinkId, outputSelector) {
  if (typeof element.sinkId !== 'undefined') {
    element.setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId} to element with ${element.title} as source.`);
        })
        .catch(error => {
          let errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to first output device in the list as it's the default.
          outputSelector.selectedIndex = 0;
        });
  } else {
    console.warn('Browser does not support output device selection.');
  }
}

function changeAudioDestination(event) {
  const deviceId = event.target.value;
  const outputSelector = event.target;
  // FIXME: Make the media element lookup dynamic.
  const element = event.path[2].childNodes[1];
  attachSinkId(element, deviceId, outputSelector);
} */

/*
// Attach audio output device to video element using device/sink ID.
async function attachSinkId() {
  const sinkId = audioOutputSelect.value;
  if (typeof sinkId !== 'undefined') {
    audioOutputSelect.setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
        })
        .catch(error => {
          let errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to first output device in the list as it's the default.
          audioOutputSelect.selectedIndex = 0;
        });
  } else {
    console.warn('Browser does not support output device selection.');
  }
}

async function changeAudioDestination() {
  const audioDestination = audioOutputSelect.value;
  attachSinkId(audioOutputSelect, audioDestination);
}*/

async function handleError(error) {
  console.log(
    'error'+error
   );
  }

/*async function gotStream() {
  const stream = await navigator.mediaDevices.getUserMedia({audio:true});
  window.stream = stream; // make stream available to console
  gumAudio.srcObject = stream;
  gumVideo.srcObject = stream;
}*/

/* async function init() {
  if (chrome.runtime.lastError) {
    // Failed - tab is gone
    console.log(`Tab  no longer exists.`);
}
else {
  // Hide the slider until we know the initial volume
  //sliderElem.style.opacity = '0'

  /* Promise.resolve(getActiveTabVolume()).then((initialValue)=>{
    slider.value = initialValue * 100

    sliderElem.style.opacity = '1'
  
<<<<<<< HEAD
  }) */ 
=======
  }) */
  
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
 	


function output_onchange(e) {
  console.log('Output on change execution')
	var sink_no = e.target.value;	
	chrome.tabs.query({active: true, currentWindow: true},
		function(tabs) {
			var activeTab = tabs[0];
			console.log('Sending message: browser_action_commit, sink_no: ' + sink_no);
			chrome.tabs.sendMessage(activeTab.id, { // send to all frames without using options = {'frameId': N} 
				"message": "browser_action_commit",
				"sink_no":  sink_no
			});
			//window.close();
		}
	);
};

//audioInputSelect.onchange = start;
//audioOutputSelect.onchange = attachSinkId;
<<<<<<< HEAD
=======
init();
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
