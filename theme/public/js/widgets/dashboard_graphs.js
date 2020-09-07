$(document).ready(function () {
  // selectors for dashboard graphs and number cards
  const numberCardClsEl = ".dashboard-graph .grid-col-3",
    graphsClsEl = ".dashboard-graph .grid-col-2",
    graphsClsModifiedEl =
      ".dashboard-graph .widget-group.col-md-9 .dashboard-widget-box";

  // removing grid from number cards and applying bootstrap grid {col-md-3}
  $(document).on("DOMSubtreeModified", numberCardClsEl, function () {
    $(this).removeClass("grid-col-3");
    $(this).parents(".widget-group").addClass("col-md-3");
  });

  // removing grid from graphs and applying bootstrap grid {col-md-9}
  $(document).on("DOMSubtreeModified", graphsClsEl, function () {
    $(this).removeClass("grid-col-2");
    $(this).parents(".widget-group").addClass("col-md-9");
  });

  // adjusting sizes of dashboard cards
  $(document).on("DOMSubtreeModified", graphsClsModifiedEl, function () {
    let clsCheck = $(this).hasClass("full-width");
    if (clsCheck) {
      $(this).addClass("col-md-12");
    } else {
      $(this).addClass("col-md-6").addClass("custom-half-div");
    }
  });
});
