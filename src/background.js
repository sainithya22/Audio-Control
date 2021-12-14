/// <reference path="../node_modules/chrome-extension-async/chrome-extension-async.d.ts" />
import "chrome-extension-async";
<<<<<<< HEAD
//import Message from './interfaces/Message'
=======

>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
"use strict";

var stored_id = "default";
var stored_no = 0;
var extension_id = chrome.runtime.id;
var default_no = document.getElementById(
  "default_no"
);

chrome.contentSettings["microphone"].set({
  primaryPattern: "*://" + extension_id + "/*",
  setting: "allow",
});
<<<<<<< HEAD
chrome.contentSettings["popups"].set({
  primaryPattern: "*://" + extension_id + "/*",
  setting: "allow",
});

// Handle messages from popup
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  console.log(message);

    if (message.method == "get-tab-volume") {
    sendResponse(await getTabVolume(message.tabId))
    /* Promise.resolve(getTabVolume(message.tabId))
      .then((response) => {
        console.log("get-tab-volume "+ response);
      sendResponse(response)})
      .catch(handleError); */
    //sendResponse(getTabVolume(message.tabId))    
  } else if (message.method == "set-tab-volume") {
    sendResponse(undefined) // Nothing to send here.
    await setTabVolume(message.tabId, message.value)
    /* Promise.resolve(setTabVolume(message.tabId, message.value))
=======

// Handle messages from popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  if (message.method == "get-tab-volume") {
    Promise.resolve(getTabVolume(message.tabId))
      .then((response) => {
        console.log("get-tab-volume "+ response);
      sendResponse(response)})
      .catch(handleError);
    //sendResponse(getTabVolume(message.tabId))
  } else if (message.method == "set-tab-volume") {
    Promise.resolve(setTabVolume(message.tabId, message.value))
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
      .then((response) => {
        console.log("set-tab-volume "+ response);
        sendResponse(undefined)
      })
<<<<<<< HEAD
      .catch(handleError); */
=======
      .catch(handleError);
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
  } else if (message.method == "AP_get_default_no") {
    console.log('Received message: ' + message.method + ' from frame ' + sender.frameId + ' on tab ' + sender.tab.id);
    if (sender.frameId != 0 ) {
      console.log('Asking top frame: report_sink_no');
<<<<<<< HEAD
      await chrome.tabs.sendMessage(sender.tab.id,
=======
      chrome.tabs.sendMessage(sender.tab.id,
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
        {"message": "report_sink_no"},
        {'frameId': 0},  // request from top frame
        function(response) {
          if (response) {
            var default_no = document.getElementById("default_no");
            console.log("Received Response from top frame: " + response.sink_no);
            if (response.sink_no != 0) {
              console.log('Reply to sub frame ' + sender.frameId + ' with: top sink_no: ' + response.sink_no);
              sendResponse({'default_no': response.sink_no});
            } else {
              console.log('Reply to sub frame ' + sender.frameId + ' with: default_no: ' + default_no.value);
              sendResponse({'default_no': default_no.value});
            }
          }
        }
      );
    } else {
      var default_no = document.getElementById("default_no");
      console.log('Reply with: default_no: ' + default_no.value);
      sendResponse({'default_no': default_no.value});
    }
  } else if (message.method == "AP_help_with_GUM") {
    console.log('Received message: ' + message.method + ', primaryPattern: ' + message.primaryPattern);
<<<<<<< HEAD
    await chrome.contentSettings['microphone'].set({'primaryPattern': message.primaryPattern,'setting':'allow'});
=======
    chrome.contentSettings['microphone'].set({'primaryPattern': message.primaryPattern,'setting':'allow'});
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
    console.log('Reply with: result: ' + 'Have fun!');
    sendResponse({'result': 'Have fun!'});
  }
  return true;
});

//const audioOutputSelect = document.getElementById("device_cache");

//audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);

function getDevices(deviceInfos) {
	var default_no = document.getElementById("default_no");
	var select = document.getElementById('device_cache');
	console.log('update_device_cache: ' + deviceInfos.length + ' device(s) total (audio/video input/output)');
	for (var i = 0; i !== deviceInfos.length; ++i) {
		var kind = deviceInfos[i].kind;
		var id = deviceInfos[i].deviceId;
		var text = deviceInfos[i].label;
		//console.log('device: ' + id + ' - ' + text);
		if (kind === 'audiooutput') {
			if (id == "default") {
				if (stored_no == 0) {
					stored_no = i;
					default_no.value = stored_no;
				}
				text = "System Default Device";
			} else if (id == "communications") {
				text = "System Default Communications Device";
			}
			//console.log('audiooutput: ' + id + ' - ' + text);
			if (text) { // only update/write cache, when we have a device label
				var option = document.getElementById(id)
				if (option) {
					option.value = text;
				} else {
					option = document.createElement("option");
					option.id = id;
					option.value = text;
					select.appendChild(option);				
				}
			}
		}
	}
}


/* async function start() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getTracks().forEach(function (track) {
    track.stop();
  });

  const audioSource = audioInputSelect.value;
  const constraints = {
    audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(getDevices)
    .catch(handleError);
}*/
async function handleError(error) {
  console.log(
   'error'+error
  );
} 

// Clean everything up once the tab is closed
//chrome.tabs.onRemoved.addListener(disposeTab);

/* Interface('CapturedTab')({
  audioContext,
  // While we will never use `streamSource` property in the code,
  // it is necessary to keep a reference to it, or else
  // it will get garbage-collected and the sound will be gone.
  streamSource,
  gainNode,
}) */

// We use promises to fight race conditions.

<<<<<<< HEAD
const tabs={}; 
=======
const tabs2={}; 
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65


//A promise is used to chain asynchronous functions where one function is executed only after success
//or failure of the previous func. Used to prevent callback hell ;)

/**
 * Captures a tab's sound, allowing it to be programmatically modified.
 * Puts a promise into the `tabs` object. We only need to call this function
 * if the tab isn't yet in that object.
 * @param tabId Tab ID
 */
async function captureTab(tabId) {
  /* var queryOptions = { active: true, currentWindow: true };
  var [tabs] = await chrome.tabs.query(queryOptions); */
<<<<<<< HEAD
  tabs[tabId] = new Promise(async resolve => {
=======
  tabs2[tabId] = new Promise(async (resolve) => {
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
    const stream = await chrome.tabCapture.capture({
      audio: true,
      video: false,
    });

    //AudioContext refers to audio graph: Source--->Destination
    const audioContext = new AudioContext();

    /**The MediaStreamSource interface is a type of AudioNode which operates as an audio source whose media
     is received from a MediaStream */
    const streamSource = audioContext.createMediaStreamSource(stream);

    //To add a gain node between source and destination to manipulate volume of a tab
    // Source---> Gain node---> Destination
    const gainNode = audioContext.createGain();

<<<<<<< HEAD
    //const waveshaper = audioContext.createWaveShaper();

    streamSource.connect(gainNode);
    //gainNode.connect(waveshaper);
    gainNode.connect(audioContext.destination);

    resolve({ audioContext, streamSource, gainNode });
  });
  
=======
    const waveshaper = audioContext.createWaveShaper();

    streamSource.connect(gainNode);
    gainNode.connect(waveshaper);
    waveshaper.connect(audioContext.destination);

    resolve({ audioContext, streamSource, gainNode });
  });
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
}

/**
 * Returns a tab's volume, `1` if the tab isn't captured yet.
 * @param tabId Tab ID
 */
async function getTabVolume(tabId) {
  /* var queryOptions = { active: true, currentWindow: true };
  var [tabs] = await chrome.tabs.query(queryOptions); */
<<<<<<< HEAD
  var volume=tabId in tabs ? (await tabs[tabId]).gainNode.gain.value : 1;
=======
  var volume=tabId in tabs2 ? (await tabs2[tabId]).gainNode.gain.value : 1;
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
  console.log("Volume" +volume);
  return volume;
}

/**
 * Sets a tab's volume. Captures the tab if it wasn't captured.
 * @param tabId Tab ID
 * @param value Volume. `1` means 100%, `0.5` is 50%, etc
 */
async function setTabVolume(tabId, value) {
  /* var queryOptions = { active: true, currentWindow: true };
  var [tabs] = await chrome.tabs.query(queryOptions); */
<<<<<<< HEAD
  if (!(tabId in tabs)) {
    captureTab(tabId);
  }

  (await tabs[tabId]).gainNode.gain.value = value;
=======
  if (!(tabId in tabs2)) {
    captureTab(tabId);
  }

  (await tabs2[tabId]).gainNode.gain.value = value;
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
  updateBadge(tabId, value);
}

/**
 * Updates the badge which represents current volume.
 * @param tabId Tab ID
 * @param value Volume.`1` will display 100, `0.5` - 50, etc
 */
async function updateBadge(tabId,value) {
  /* var queryOptions = { active: true, currentWindow: true };
  var [tabs] = await chrome.tabs.query(queryOptions); */
<<<<<<< HEAD
  if (tabId in tabs) {
=======
  if (tabId in tabs2) {
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
    const text = String(Math.round(value * 100));
    chrome.browserAction.setBadgeText({ text, tabId });
  }
}

/**
 * Removes the tab from `tabs` object and closes its AudioContext.
 * This function gets called when a tab is closed.
 * @param tabId Tab ID
 */
<<<<<<< HEAD
// Clean everything up once the tab is closed
chrome.tabs.onRemoved.addListener(disposeTab)
=======

>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65

async function disposeTab(tabId) {
  /* var queryOptions = { active: true, currentWindow: true };
  var [tabs] = await chrome.tabs.query(queryOptions); */
<<<<<<< HEAD
  if (tabId in tabs) {
    (await tabs[tabId]).audioContext.close();
    delete tabs[tabId];
  }
}


// -- Initialize device_cache (list of available devices)
function init() {
  var default_no = document.getElementById("default_no") ;
  default_no.value = stored_no;  
  navigator.mediaDevices.enumerateDevices().then(getDevices).catch(handleError);
}


=======
  if (tabId in tabs2) {
    (await tabs2[tabId]).audioContext.close();
    delete tabs2[tabId];
  }
}

>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
chrome.storage.local.get("AP_default_no", function (result) {
  stored_no = result["AP_default_no"];
  if (!stored_no) {
    stored_no = 0;
  }
  console.log("stored_no: " + stored_no);
  init();
  //return output_stored_no;
});

<<<<<<< HEAD
init();
=======
// -- Initialize device_cache (list of available devices)
function init() {
  var default_no = document.getElementById("default_no") ;
  default_no.value = stored_no;  
  navigator.mediaDevices.enumerateDevices().then(getDevices).catch(handleError);
}

//init();
>>>>>>> 7927d7820043bcf538d245413c611bc0fb71da65
//start();
