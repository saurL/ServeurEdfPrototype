var x, i, j, l, ll, selElmnt, a, b, c;

function isArgumentFilterValid(SelectValues, valueToCheck) {
  for (j = 0; j < SelectValues.length; j++) {
    if (selElmnt.options[j].innerHTML === valueToCheck) {
      return true
    }
  }
    return false
}

function CreateCustomSelector(className){
  x = document.getElementsByClassName(className);
  l = x.length;

  for (i = 0; i < l; i++) {
    var classElement = x[i].getAttribute("class")
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    if (classElement.includes("metier")) {
      a.classList.add("metierFilter")
    }
    if (classElement.includes("parameter")) {
      a.classList.add("parameterSort")
    }
    let searchParams = new URLSearchParams(window.location.search)
    let filterValue = searchParams.get("filter")
    if (searchParams.has("filter") && classElement.includes("metier") && isArgumentFilterValid(selElmnt.options, filterValue)) {
      a.innerHTML = filterValue
    }
    else {
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    }
  
  
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      if (c.innerHTML == a.innerHTML) {
        c.setAttribute("class", "same-as-selected");
      }
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  
  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  
  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect); 
}
export{CreateCustomSelector }