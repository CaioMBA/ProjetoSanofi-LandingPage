const form = document.getElementById("form");
const Nome = document.getElementById("Nome");
const Email = document.getElementById("Email");
const ideia = document.getElementById("ideia");
const TeamMails = [
  "caiombaraujo@gmail.com",
  "lucasfm179@gmail.com",
  "Brunocyjin98@gmail.com",
  "rafaelaosugi@hotmail.com",
  "luanaddias06@gmail.com",
];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const ideiaValue = ideia.value.trim();
  const EmailValue = Email.value.trim();
  const NomeValue = Nome.value.trim();

  if (ideiaValue === "") {
    setErrorFor(ideia, "Ideia|Sugestão é um campo obrigatório");
  } else {
    setSuccessFor(ideia);
  }
  if (EmailValue === "") {
    setErrorFor(Email, "Email é um campo obrigatório");
  } else {
    setSuccessFor(Email);
  }
  if (NomeValue === "") {
    setErrorFor(Nome, "Nome é um campo obrigatório");
  } else {
    setSuccessFor(Nome);
  }

  const formControls = form.querySelectorAll(".form-control").length;
  const formControlSuccess = form.querySelectorAll(
    ".form-control.success"
  ).length;
  if (formControls === formControlSuccess) {
    callNotifyAPI(TeamMails, `${NomeValue} => ${ideiaValue}`, false);
    CallBackMessage = `Muito obrigado pela ideia ${NomeValue}, estamos analisando sua sugestão: ${ideiaValue}. Entraremos em contato o mais rápido possível`;
    callNotifyAPI([EmailValue], CallBackMessage);
    ClearForms();
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;

  const small = formControl.querySelector("small");

  small.innerText = message;
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function ClearForms() {
  Nome.value = "";
  Email.value = "";
  ideia.value = "";
}

async function callNotifyAPI(mail, msg, omitir = true) {
  mailbase = `<!DOCTYPE html>
              <html lang=\"en\">
              <head>  <meta charset=\"UTF-8\">  
              <meta name=\"viewport\" 
              content=\"width=device-width, initial-scale=1.0\">  
              <title>Fancy Email</title>  
              <style>    
                body {      font-family: Arial, sans-serif;      margin: 0;      padding: 0;      background-color: #f5f5f5;    }    .container {      width: 600px;      margin: 50px auto;      background-color: #fff;      border-radius: 5px;      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);    }    .header {      padding: 20px;      background-color: #4CAF50;      color: #fff;      text-align: center;    }    .content {      padding: 30px;    }    .content h2 {      font-size: 24px;      margin-bottom: 15px;    }    .content p {      line-height: 1.5;    }    .footer {      padding: 10px;      text-align: center;      color: #aaa;    }    a {      color: #4CAF50;      text-decoration: none;    }    a:hover {      text-decoration: underline;    }  
              </style>
              </head>
              <body>  
              <div class=\"container\">    
              <header class=\"header\">      
              <h2>Sugestão do forms da LandingPage</h2>    
              </header>    
              <div class=\"content\">      
              <h2>Olá, tudo bem?</h2>      
              <p>
                ${msg}
              </p>     
              <p>Aqui o link de onde veio a requisição: <a href=\"https://sanofi-micro-wms-landingpage.netlify.app">Projeto Sanofi: Landing Page</a>
              </p>   
              </div>    
              <footer class=\"footer\">      
              <p>,</p>      
              <p>Your Name</p>    
              </footer>  
              </div></body></html>`;
  try {
    await fetch("http://maincaitoserver.ddns.net:7002/api/Notification/Send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mails: [
          {
            mailDestinations: mail,
            subject: "Sugestão do forms da LandingPage",
            msg: mailbase,
          },
        ],
        phones: null,
      }),
    }).then((response) => {
      if (response.status == 200) {
        if (omitir) {
          console.log("Mensagem enviada com sucesso!");
        } else {
          alert("Mensagem enviada com sucesso!");
        }
      } else {
        if (omitir) {
          console.log(response.body);
        } else {
          alert("Erro ao enviar mensagem!");
        }
      }
    });
  } catch {
    if (omitir) {
      console.log("Erro ao enviar mensagem!");
    } else {
      alert("Erro ao enviar mensagem!");
    }
  }
}
