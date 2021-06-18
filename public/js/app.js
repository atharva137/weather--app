console.log("clients side scripts");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

msg1.textContent ='';
msg2.textContent='';


weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  console.log(location);
  msg2.textContent='';

  fetch("http://localhost:3000/weather?address=" +location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return msg1.textContent=data.error
        }
        msg1.textContent=data.location;
        msg2.textContent=data.forecast;
      });
    }
  );
});
