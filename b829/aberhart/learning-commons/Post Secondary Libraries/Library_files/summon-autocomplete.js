//<![CDATA[ 
$(window).load(function(){
    $("#wiki").autocomplete({
        source: function (request, response) {
            //console.log(request.term);
            $.ajax({
                url: "http://ucalgary.summon.serialssolutions.com/metadata/suggest/suggest",
                dataType: "jsonp",
                data: {
                    type_strict: 'should',
                    all_types: 'true',
                    prefix: request.term
                },
                success: function (data) {
                    response($.map(data.result, function (item) {
						//alert("hey " + item.name);
                        return item.name;
                    }));
                }
            });
        },
			select: function(event, ui) {
                $(event.target).val(ui.item.value);
                $('form').submit();
                return false;
            },
        minLength: 1
    });
});//]]>  
          
   
