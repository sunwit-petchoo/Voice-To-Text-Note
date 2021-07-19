
function test() {
  
   $.ajax({
     type: "GET",
     url: "/test2",
   
     success: function(data) {
     // send alert message when success   
    
    },
     error: function(data) {
    
     },
     dataType: "json"
   });

  
}
function stop() {
  
  $.ajax({
    type: "GET",
    url: "/test2/stop",
    data: { 
      rating: "num"
      
    },
    success: function(data) {
    // send alert message when success   
   
   },
    error: function(data) {
   
    },
    dataType: "json"
  });

 
}

function resume() {
  
  $.ajax({
    type: "GET",
    url: "/test2/resume",
    data: { 
      rating: "num"
      
    },
    success: function(data) {
    // send alert message when success   
   
   },
    error: function(data) {
   
    },
    dataType: "json"
  });

 
}
