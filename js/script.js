// State object
var state = {
  items: []
};

// Modify state with the following functions
function addItem(state, item) {
  state.items.push({
    displayName: item,
    checked: false
  });
}

function addCheck(state, idNum) {
  if (state.items[idNum].checked) {
    state.items[idNum].checked = false;
  } else {
    state.items[idNum].checked = true;
  }
}

function removeItem(state, idNum) {
  state.items.splice(idNum, 1);
}

// Render and display state in the DOM
function renderHtml(state, element) {
  var htmlStr = "</span><div class='shopping-item-controls'><button class='shopping-item-toggle'><span class='button-label'>check</span></button> <button class='shopping-item-delete'><span class='button-label'>delete</span></button></div></li>";
  function getFirstTags(index) {
    if (state.items[index].checked) {
      return "<li id="+index+"><span class='shopping-item shopping-item__checked'>";
    } else {
      return "<li id="+index+"><span class='shopping-item'>";
    }
  }
  var makeHtml = state.items.map(function(item, index) {
    return getFirstTags(index)+item['displayName']+htmlStr;
  });
  element.html(makeHtml);
}

// Event handlers
function makelist() {
  $("#js-shopping-list-form").submit(function(event) {
    addItem(state, $("#shopping-list-entry").val());
    renderHtml(state, $(".shopping-list"));
    $("#shopping-list-entry").val("")
    event.preventDefault();
  });
  $(".shopping-list").on("click", "button", function(event) {
    var type = $(this).attr("class").split(/\-/g).filter(function(item) {
      return item === "delete" || item === "toggle";
    }).join("");
    var id = Number($(this).closest("li").attr("id"));
    if (type === "delete") {
      removeItem(state, id);
    } else { // it is toggle
      addCheck(state, id);
    }
    renderHtml(state, $(".shopping-list"));
  });
}

$(function mainFn() {
  makelist();
});
