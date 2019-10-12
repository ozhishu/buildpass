(function () {
  document.getElementById('buildpassbutton').addEventListener("click", buildpass)
  function buildpass(e) {
    let p1 = document.getElementById('password1').value
    let p2 = document.getElementById('password2').value
    let encrypted = CryptoJS.MD5(p1 + p2).toString().slice(0, 12).split('');
    encrypted[0] = isNaN(encrypted[0]) ? encrypted[0].toUpperCase() : String.fromCharCode(65 + parseInt(encrypted[0], 10))
    encrypted[1] = isNaN(encrypted[1]) ? encrypted[1].toLowerCase() : String.fromCharCode(97 + parseInt(encrypted[1], 10))
    encrypted[7] = '-'
    encrypted[8] = isNaN(encrypted[8]) ? encrypted[8].charCodeAt(0) % 10 : encrypted[8]
    let res = quchong(encrypted.join(''))
    clipboard(res)
    document.getElementById('notify').style.animation = "movenotify 6s 1 linear both"
    e.target.disabled = true
    e.target.style.cssText = "background-color: #f7f7f7;border-color: #dcdee2;color: #c5c8ce;cursor: not-allowed;"
    setTimeout(function () {
      location.reload()
    }, 6000)
  }
  function quchong(str) {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      if (newStr.indexOf(str[i]) === -1) {
        newStr += str[i];
      } else {
        newStr += String.fromCharCode(str[i].charCodeAt(0) + 1);
      }
    }
    return newStr;
  }
  function clipboard(res) {
    new ClipboardJS('#buildpassbutton', {
      text: function () {
        return res
      }
    });
  }
})()