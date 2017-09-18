/* Moveable 
 * Version: 1.0
 * Author: Marty-Scott Sainty
 * 15/09/2017
 */
(function($) {
    $.fn.moveable = function(config){
        config = $.extend({
          container: "body",
          action: "prependTo",
          events:{
            move: "move",
            reverseMove: "reverseMove"
          },
          callbacks:{
            afterMove: function(element,elements){}
          }
        }, config);

        elements = this;

        this.init = function(){

          elements.on(config.events.move,function(){
            elements.move();    
          });

          elements.on(config.events.reverseMove,function(){          
            elements.reverseMove();    
          });
        };

        this.move = function(){

          elements.each(function(){
            if($(this).prev().length > 0) $(this).data('originalSibling',$(this).prev());
            else $(this).data('originalParent',$(this).parent());

            switch(config.action){
              case "prependTo": 
                $(this).prependTo(config.container).addClass("moved");
              break;
              case "appendTo":
                $(this).appendTo(config.container).addClass("moved");
              break;
            }
            
            return config.callbacks.afterMove($(this),elements);
          });
        };

        this.reverseMove = function(){

          $(config.container).find(elements).each(function(){

            if(typeof($(this).data('originalSibling')) !== "undefined" && $(this).data('originalSibling').length > 0){
               $(this).insertAfter($(this).data('originalSibling')).removeClass("moved");
            }
            else{
               $(this).prependTo($(this).data('originalParent')).removeClass("moved");
            }
          });
        };

        return this.init();
    };
    
})(jQuery);