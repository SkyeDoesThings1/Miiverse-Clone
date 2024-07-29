// Remove emulation on prod
if (typeof wiiuMemo === 'undefined') {
  window.wiiuMemo = {
    getImage: function () {
      return '../src/Memo.png';
    },
    open: function () {
      console.log('Memo is open');
    },
    isFinish: function () {
      return true;
    },
    reset: function () {
      document.getElementById('memoText').classList.add('hidden'),
        document.getElementById('memo').classList.add('hidden'),
        (document.getElementById('memo').src = '');
      if (
        document.getElementById('memoText').textContent ===
        'Heres your screenshot:'
      ) {
        console.log('Screenshot has been reset');
      } else {
        console.log('Memo has been reset');
      }
    },
  };
}

if (typeof wiiuBrowser === 'undefined') {
  window.wiiuBrowser = {
    exit: function () {
      console.log('Exiting...'),
        (window.location.href = 'http://www.google.com');
    },
    endStartUp: function () {
      console.log('Startup has ended');
    },
    lockUserOperation: function (flag) {
      if (flag === true) {
        console.log('User operation locked');
      } else {
        console.log('User operation unlocked');
      }
    },
    jumpToTvii: function () {
      console.log('Jumped to TVii');
    },
  };
}

if (typeof wiiuSound === 'undefined') {
  window.wiiuSound = {
    playSoundByName: function (label) {
      console.log(`Played sound ${label}`);
    },
  };
}

if (typeof wiiuMainApplication === 'undefined') {
  window.wiiuMainApplication = {
    getScreenShot: function (unk) {
      if (unk === true) {
        console.log('Got screenshot as base64(?)');
        return '../src/ss.png';
      } else {
        console.log('Got screenshot');
        return '../src/ss.png';
      }
    },
  };
}

// Where the code actually begins
function stopLoadingSetup() {
  wiiuBrowser.endStartUp(),
    wiiuSound.playSoundByName('BGM_OLV_INIT', 3),
    wiiuBrowser.lockUserOperation(false);
}

function stopLoading() {
  wiiuBrowser.endStartUp();
  wiiuSound.playSoundByName('BGM_OLV_MAIN', 3);
  setTimeout(function () {
    wiiuSound.playSoundByName('BGM_OLV_MAIN_LOOP_NOWAIT', 3);
  }, 90000);
  wiiuBrowser.lockUserOperation(false);
}

function startDrawing(reset) {
  if (typeof wiiuMemo === 'undefined') {
    wiiuMemo.open(reset);
    setTimeout(function () {
      if (wiiuMemo.isFinish() === true) {
        document.getElementById('memoText').textContent = 'Heres your drawing:';
        document.getElementById('memoText').classList.remove('hidden');
        document.getElementById('memo').classList.remove('hidden');
        document.getElementById('memo').src = wiiuMemo.getImage(true);
      }
    }, 250);
  } else {
    wiiuMemo.open(reset);
    setTimeout(function () {
      if (wiiuMemo.isFinish() === true) {
        document.getElementById('memoText').textContent = 'Heres your drawing:';
        document.getElementById('memoText').classList.remove('hidden');
        document.getElementById('memo').classList.remove('hidden');
        document.getElementById('memo').src =
          'data:image/png;base64,' + wiiuMemo.getImage(false);
      }
    }, 250);
  }
}

function resetDrawing() {
  wiiuMemo.reset();
  document.getElementById('memoText').classList.add('hidden');
  document.getElementById('memo').classList.add('hidden');
  document.getElementById('memo').src = '';
}

function openTVii() {
  wiiuBrowser.jumpToTvii();
}

function exit() {
  wiiuBrowser.exit();
}

function takeScreenshot() {
  if (typeof wiiuMainApplication === 'undefined') {
    document.getElementById('memoText').textContent = 'Heres your screenshot:';
    document.getElementById('memo').src =
      'data:image/png;base64,' + wiiuMainApplication.getScreenShot(true);
    document.getElementById('memoText').classList.remove('hidden');
    document.getElementById('memo').classList.remove('hidden');
  } else {
    setTimeout(function () {
      document.getElementById('memoText').textContent =
        'Heres your screenshot:';
      document.getElementById('memo').src =
        wiiuMainApplication.getScreenShot(true);
      document.getElementById('memoText').classList.remove('hidden');
      document.getElementById('memo').classList.remove('hidden');
    }, 250);
  }
}

function back() {
  history.back();
}

function refresh() {
  location.reload();
}
