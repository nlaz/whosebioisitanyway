var inputForm = document.getElementById("input");

inputForm.onkeyup = function(e) {
  e = e || window.event;

  if (e.keyCode == 13) {
    var answer = inputForm.value;

    var request = new XMLHttpRequest();
    request.open('GET', '/friend.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var user = JSON.parse(request.responseText);
        if (answer === user.name || answer === user.screen_name) {
          success(user);
        } else {
          failure(user);
        }
        revealReset(user);
      }
    };

    request.send();
    e.preventDefault();
  }
};

function success(friend) {
  var title = document.getElementById("title");
  title.innerHTML = "Correct! It's " + friend.name + "!";
  title.style.color = "#55acee";
}

function failure(friend) {
  var title = document.getElementById("title");
  title.innerHTML = "Wrong! It's actually " + friend.name + "!";
  title.style.color = "#a31400";
}

function revealReset(friend) {
  document.getElementById("profile").src = friend.profile_image_url.replace("_normal", "");
  resetForm(3000);
}

function resetForm(time) {
  document.getElementById("countdown").innerHTML = time/1000;
  var timeLeft = time - 1000;
  setTimeout(function () { 
    if (time <= 0){
      location.reload();
    } else {
      resetForm(timeLeft);
    }
  }, 1000);
}