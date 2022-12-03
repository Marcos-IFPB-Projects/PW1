let AddField = true;


function openAddField()
{
  const mediaQuery = window.matchMedia('(max-width: 768px)')
  // Check if the media query is true
  if (mediaQuery.matches) {
    document.getElementById("Add").style = "width: 360px;";
  }
  else
  {
    document.getElementById("Add").style = "width: 400px;";
  }
  document.getElementById("addIcon").classList.remove("fa-plus");
  document.getElementById("addIcon").classList.add("fa-xmark")
  document.getElementById("nome").style = "display: block; width: 70%"
  document.getElementById("savePoint").style = "display: block";
}

function closeAddField()
{
    document.getElementById("Add").style = "width: 50px"
    document.getElementById("addIcon").classList.remove("fa-xmark");
    document.getElementById("addIcon").classList.add("fa-plus")
    document.getElementById("nome").style = "display: none; width: 70%"
    document.getElementById("savePoint").style = "display: none";
}

function callField()
{
  if(AddField) openAddField();
  else closeAddField();
  AddField = !AddField; 
}

function showMultiPopUp()
{

    popupClass = document.getElementById("multiPopUp");
    popupClass.classList.remove("popupClosing")
    popupClass.offsetWidth
    popupClass.classList.add("popupShowing")
    popUp = document.getElementById("multiPopUp").style = "display: block !important;"

}
let RemoveField = true


function CallRemove()
{
  if(RemoveField) CallRemoveOne();
  else backToRemove();
  RemoveField = !RemoveField; 
}

function CallRemoveOne()
{
  tlt = document.getElementById("Deltitle").innerText = "Remover Ponto";
  document.getElementById("Delmessage").innerText = "Informe o nome do Ponto que deseja Remover"
  document.getElementById("pointName").style = "display: block";
  document.getElementById("btn1").innerText = "Voltar";
  document.getElementById("btn2").innerText = "Remover Ponto"
}

function backToRemove()
{
  tlt = document.getElementById("Deltitle").innerText = "Aviso";
  document.getElementById("message").innerText = "O que deseja fazer?";
  document.getElementById("pointName").style = "display: none";
  document.getElementById("btn1").innerText = "Remover Ponto";
  document.getElementById("btn2").innerText = "Remover Todos"
}

function showPopUp(title, message)
{

    
    popupClass = document.getElementById("popUp");
    popupClass.classList.remove("popupClosing")
    popupClass.offsetWidth
    popupClass.classList.add("popupShowing")

    tlt = document.getElementById("title").innerText = title;
    msg = document.getElementById("message").innerText = message;
    popUp = document.getElementById("popUp").style = "display: block !important;"

    if(title == "Sucesso")
    {
        document.getElementById("title").classList.add("text-success")
        document.getElementById("title").classList.remove("text-warning")
        document.getElementById("title").classList.remove("text-danger")
    }
    else if(title == "Aviso")
    {
        document.getElementById("title").classList.add("text-warning")
        document.getElementById("title").classList.remove("text-success")
        document.getElementById("title").classList.remove("text-danger")
    }
    else
    {
        document.getElementById("title").classList.add("text-danger")
        document.getElementById("title").classList.remove("text-success")
        document.getElementById("title").classList.remove("text-warning")
    }
}

function popupFadeOut()
{
  popupClass = document.getElementById("popUp");
  popupClass.classList.remove("popupShowing")
  popupClass.classList.add("popupClosing")
  multiPopupClass = document.getElementById("multiPopUp");
  multiPopupClass.classList.remove("popupShowing")
  multiPopupClass.classList.add("popupClosing")

  setTimeout(function() {
    $(multiPopupClass).css('display', 'none');
}, 1000);

  setTimeout(function() {
    $(popupClass).css('display', 'none');
}, 1000);
}

function popupRemoveFade()
{
  popupClass = document.getElementById("popUp");
  popupClass.classList.remove("popupClosing")
}


function openApp()
{
  
  document.getElementById("initScreen").style = "display: none !important;"
  document.getElementById("app").style = "display: block !important;"
}

function closePopUp()
{
  popupFadeOut()
}

function closeRestart()
{
  msg = document.getElementById("message").textContent;

  
  

  remove = msg.includes("Removidos");
  if(remove)
  {
    location.reload();
    return false;
  }
  
}
