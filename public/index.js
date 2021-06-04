const input = document.querySelector(".input");
const outputForm = document.querySelector(".output-form");
const output = document.querySelector(".output");
const shortenButton = document.querySelector(".btn");

//copying feature
function Copy() {
  var copyText = document.getElementById("outputUrl");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

tippy("#copyButton", {
  content: "Copied!",
  trigger: "click",
  hideOnClick: false,
  onShow(instance) {
    setTimeout(() => {
      instance.hide();
    }, 1000);
  },
});

const isValidUrl = (inputUrl) => {
  let url;
  try {
    url = new URL(inputUrl);
    console.log(url);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

shortenButton.addEventListener("click", () => {
  const url = input.value;
  if (!isValidUrl(url)) {
    console.log("Not" + url);
    outputForm.classList.add("active");
    output.value = "Please, provide a valid url";
    setTimeout(() => {
      outputForm.classList.remove("active");
      output.value = "";
    }, 2000);
  } else {
    console.log(url);
    fetch("/api/urls", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        long_url: url,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        const short_url = `${document.location.origin}/${json.id}`;
        output.value = short_url;
        //displayUrl(url, short_url);
      });
  }
});
